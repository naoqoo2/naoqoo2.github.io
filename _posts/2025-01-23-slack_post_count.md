---
title: "Slackチャンネルの投稿数を集計して「コミュニケーションカオス」を作る"
categories:
  - blog
tags:
  - Slack
  - SlackAPI
  - GAS
  - スプレッドシート
  - コミュニケーション
---

開発チームのコミュニケーションを活性化させるために、Slackチャンネルの投稿数を毎週集計する仕組みを作りました！  
今年は「コミュニケーションがカオスな状態」を目指しています！カオスが極まる⚽️

## コミュニケーションカオスとは？

リモートワークでは、日によっては全く発言がないメンバーもいます。一方で、コミュニケーション量は仕事の質に直結する重要な要素です。  
参考：[コミュニケーション『量』について考える](https://coach.co.jp/view/20120328.html)

そこで、チャンネルが業務の話題や雑談、時には叫び声(!?)で溢れかえり、活発な交流が行われている状態を「コミュニケーションカオス」と定義しました！

もちろん、カオスになった結果、情報がスパゲッティ化して仕事がしづらくなる可能性はあります。ただ、それは次の段階で解決すべき悩みですね。それよりもまずは発言量を増やし、チームの雰囲気を盛り上げることを優先します！

## なぜ投稿数を集計するのか？

- 現状を可視化する
  - 誰がどのくらい発言しているのか見える化することで、リモートでもメンバー間の交流状況を把握できます。
- 投稿数を増やすモチベーション
  - データ化することで、小さなゲーム感覚で投稿数アップを狙えます。
- チームのつながり強化
  - 雑談や日常の小ネタも増えることで、コミュニケーションがより多様になります。

## やったこと

- 特定チャンネルの投稿数を毎週集計
  - Google Apps Script (GAS) を活用。
  - SlackAPIを使って投稿数を取得。
  - スレッド内の投稿は対象外。（カオスを作りたいので）
- 集計結果をスプレッドシートに保存
  - 日付ごとに投稿数を記録して、推移をわかりやすく。
- Slackに結果を自動投稿
  - 毎週の集計結果をSlackチャンネルにシェアし、チーム全体で共有。
    - ![こんな感じ](/assets/images/20250121/image.png)
- トリガーを設定して自動化
  - GASのトリガー機能で毎週決まった時間に実行。

### コード

```javascript
// 集計対象のチャンネル
const CHANNEL_IDS = [
  'C0123456781',
  'C0123456782',
];
// Slack通知先
const POST_CHANNEL_ID = 'C0123456783';
// 除外する名前の配列
const EXCLUDED_USERS = ['Notion', 'Slackbot'];

function fetchMessageCounts() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();

  // 集計範囲（実行日の前日までの1週間分）
  const today = new Date(); // 実行日
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 23, 59, 59); // 前日の23:59:59
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 6, 0, 0, 0); // 前日から7日前の0:00:00
  // 期間指定用
  // const startDate = new Date('2024-12-01'); // 開始日
  // const endDate = new Date('2025-01-01');   // 終了日

  // 日付範囲をUNIXタイムスタンプに変換
  const oldest = Math.floor(startDate.getTime() / 1000);
  const latest = Math.floor(endDate.getTime() / 1000);

  // Slackトークンを取得
  const SLACK_TOKEN = getSlackToken();

  // ユーザーID → 表示名のマッピングを取得
  const userNames = fetchUserNames(SLACK_TOKEN);

  const messageCounts = {};

  // 各チャンネルのメッセージを取得
  CHANNEL_IDS.forEach(channelId => {
    const messages = getAllChannelMessages(channelId, oldest, latest, SLACK_TOKEN);
    messages.forEach(message => {
      const user = userNames[message.user] || 'Unknown';
      messageCounts[user] = (messageCounts[user] || 0) + 1;
    });
  });

  // 発言数を多い順にソート
  const sortedMessageCounts = Object.entries(messageCounts)
    .filter(([user]) => !EXCLUDED_USERS.includes(user)) // 除外するユーザーをフィルタリング
    .sort(([, countA], [, countB]) => countB - countA); // 発言数の降順でソート

  // スプレッドシートに書き込み
  writeToSheet(sheet, startDate, sortedMessageCounts);

  // ソート結果をSlackに投稿
  postToSlack(sortedMessageCounts, SLACK_TOKEN, POST_CHANNEL_ID, startDate, endDate);
}

/**
 * Slack APIでユーザー情報を取得
 */
function fetchUserNames(SLACK_TOKEN) {
  const apiUrl = "https://slack.com/api/users.list";
  const options = {
    method: "get",
    headers: {
      Authorization: `Bearer ${SLACK_TOKEN}`,
    },
  };

  const jsonResponse = fetchWithRateLimit(apiUrl, options);
  if (!jsonResponse) return {};

  const userNames = {};
  jsonResponse.members.forEach((member) => {
    userNames[member.id] = member.profile.display_name || member.profile.real_name;
  });
  return userNames;
}

/**
 * 全メッセージを取得
 */
function getAllChannelMessages(channelId, oldest, latest, SLACK_TOKEN) {
  const url = 'https://slack.com/api/conversations.history';
  let allMessages = [];
  let cursor = null;

  do {
    const options = {
      method: 'get',
      headers: { Authorization: `Bearer ${SLACK_TOKEN}` },
    };

    const query = `?channel=${channelId}&oldest=${oldest}&latest=${latest}&limit=1000${cursor ? `&cursor=${cursor}` : ''}`;
    const response = UrlFetchApp.fetch(url + query, options);
    const json = JSON.parse(response.getContentText());

    if (!json.ok) {
      throw new Error(`Error fetching messages: ${json.error}`);
    }

    allMessages = allMessages.concat(json.messages || []);
    cursor = json.response_metadata?.next_cursor || null;

  } while (cursor);

  return allMessages;
}

/**
 * スプレッドシートに書き込み
 */
function writeToSheet(sheet, startDate, sortedMessageCounts) {
  const date = Utilities.formatDate(startDate, 'Asia/Tokyo', 'yyyy/MM/dd');

  // スプレッドシートが空の場合にヘッダーを追加
  if (sheet.getLastColumn() === 0) {
    sheet.appendRow(['User', date]);
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const existingDates = headers.slice(1);

  // 日付列が既にあるか確認
  let dateColIndex = existingDates.indexOf(date) + 2;
  if (dateColIndex === 1) {
    dateColIndex = headers.length + 1;
    sheet.getRange(1, dateColIndex).setValue(date);
  }

  // ユーザーごとに発言数を書き込み
  sortedMessageCounts.forEach(([user, count]) => {
    const rowIndex = findOrCreateUserRow(sheet, user);
    sheet.getRange(rowIndex, dateColIndex).setValue(count);
  });
}

/**
 * ユーザー行を検索または作成
 */
function findOrCreateUserRow(sheet, user) {
  const lastRow = sheet.getLastRow();
  let users = [];

  if (lastRow > 1) {
    users = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
  }

  let rowIndex = users.indexOf(user) + 2;
  if (rowIndex === 1) {
    rowIndex = users.length + 2;
    sheet.getRange(rowIndex, 1).setValue(user);
  }

  return rowIndex;
}

/**
 * Slackに投稿
 */
function postToSlack(sortedMessageCounts, SLACK_TOKEN, channelId, startDate, endDate) {
  const startDateFormatted = Utilities.formatDate(startDate, 'Asia/Tokyo', 'yyyy/MM/dd');
  const endDateFormatted = Utilities.formatDate(endDate, 'Asia/Tokyo', 'yyyy/MM/dd');

  const messageHeader = `発言数 (${startDateFormatted} - ${endDateFormatted})\n`;
  const messageBody = sortedMessageCounts
    .map(([user, count], index) => `- ${user}: ${count}件`)
    .join('\n');

  const message = messageHeader + messageBody;

  const url = "https://slack.com/api/chat.postMessage";
  const options = {
    method: "post",
    headers: {
      Authorization: `Bearer ${SLACK_TOKEN}`,
      "Content-Type": "application/json",
    },
    payload: JSON.stringify({
      channel: channelId,
      text: message,
    }),
  };

  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  if (!jsonResponse.ok) {
    throw new Error(`Error posting to Slack: ${jsonResponse.error}`);
  }
}

/**
 * Slackトークンを取得
 */
function getSlackToken() {
  const properties = PropertiesService.getScriptProperties();
  return properties.getProperty("SLACK_TOKEN");
}

/**
 * レート制限対応のAPIリクエスト
 */
function fetchWithRateLimit(url, options) {
  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  if (jsonResponse.ok) {
    return jsonResponse;
  } else if (jsonResponse.error === "ratelimited") {
    const retryAfter = parseInt(response.getHeaders()['Retry-After'] || '1', 10) * 1000;
    Utilities.sleep(retryAfter);
    return fetchWithRateLimit(url, options);
  } else {
    throw new Error(`Slack API Error: ${jsonResponse.error}`);
  }
}
```

## 実行結果と今後の期待

この取り組みはまだ始めたばかりなので、成果についてはまたどこかでご報告できればと思います！  
まずは「カオスが当たり前」の状態を作り、そこからどんな化学反応が生まれるのか楽しみです😎

それではまた！