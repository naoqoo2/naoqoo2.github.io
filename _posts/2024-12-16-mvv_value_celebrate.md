---
title: "MVVのValueを体現している人を毎月表彰する🎉"
categories:
  - blog
tags:
  - MVV
  - Slack
  - Reacji-Channeler
  - GAS
---

これは [株式会社マイホム Advent Calendar 2024](https://qiita.com/advent-calendar/2024/myhm) 16日目の記事です。

## はじめに

弊社には5つのValueがあり、Slackでそれぞれのカスタム絵文字を用意しています。

- One Team
- User First
- Professional
- Love
- Playful

日々の業務で「これはValueを体現しているな！」という行動に対してValueスタンプを送り合い、
毎月の月初会にてその月に最もValueを体現した人を表彰しています🎉👑

※過去にも似た記事（[Slackリアクションランキング、特定のリアクションを受け取った、送った人を集計する](https://naoqoo2.com/blog/Slack%E3%83%AA%E3%82%A2%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%A9%E3%83%B3%E3%82%AD%E3%83%B3%E3%82%B0-%E7%89%B9%E5%AE%9A%E3%81%AE%E3%83%AA%E3%82%A2%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E5%8F%97%E3%81%91%E5%8F%96%E3%81%A3%E3%81%9F-%E9%80%81%E3%81%A3%E3%81%9F%E4%BA%BA%E3%82%92%E9%9B%86%E8%A8%88%E3%81%99%E3%82%8B/)）を投稿しているのですが、それの最新版となります😆

## Valueスタンプが付いたら専用のチャンネルに通知！

Valueスタンプが付いたら専用チャンネルに通知する仕組みは、
[Reacji Channeler](https://reacji-channeler.builtbyslack.com/) というSlackアプリを利用しています😃
設定も簡単でとても便利です。（1つのスタンプに対して1つのチャンネルしか設定できない）

![alt text](/assets/images/20241216/image-2.png)

これにより社員はリアクションがついたことをリアルタイムで知ることができ、
「他部署の〇〇さん頑張っているな！うちも負けてられない！」と刺激を得ることができます。
日々Valueを忘れないことにも一役買っています😉

## 毎月集計してランキングを作る

それぞれのValueが何回押されたかをGASで集計しています。

コードを下記に記載します。
スクリプトプロパティに SLACK_TOKEN を定義しています。

このコードは上記Value専用チャンネルの1ヶ月間のデータを参照し、
元となったメッセージを解析して何回スタンプを受けたかを集計しています。
実行するとこんな感じで月ごとのシートが作られます。

![alt text](/assets/images/20241216/image.png)

※以前は[【GAS】SlackAPIで特定期間のメッセージとスレッドを全て取得する](https://naoqoo2.com/blog/GAS-SlackAPI%E3%81%A7%E7%89%B9%E5%AE%9A%E6%9C%9F%E9%96%93%E3%81%AE%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%81%A8%E3%82%B9%E3%83%AC%E3%83%83%E3%83%89%E3%82%92%E5%85%A8%E3%81%A6%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B/) という方法で行っていたのですが、速度と手間（メッセージ量が多いと期間を分割する必要があった）を改良したバージョンとなります！
リファクタ大事！😎✨

```javascript

// チャンネルのIDとスタンプ名を定義する
const CHANNEL_IDS = {
  professional: "C0123456781",
  playful: "C0123456782",
  "user-first": "C0123456783",
  love: "C0123456784",
  "one-team": "C0123456785",
};
const MVV_REACTIONS = ["ゆーざー", "professional", "らぶ", "ぷれい", "わんちーむ"];

/**
 * メイン関数
 */
function main() {
  const SLACK_TOKEN = getSlackToken();
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const startOfMonth = lastMonth.toISOString();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString();
  const sheetName = Utilities.formatDate(lastMonth, "Asia/Tokyo", "yyyyMM"); // シート名 (例: 202412)

  const results = {};
  const processedUrls = new Set();

  for (const [reactionKey, channelId] of Object.entries(CHANNEL_IDS)) {
    const messages = fetchMessagesWithUrls(channelId, startOfMonth, endOfMonth, SLACK_TOKEN);
    messages.forEach((url) => {
      if (processedUrls.has(url)) return; // 重複チェック
      processedUrls.add(url);

      const originalMessage = fetchOriginalMessageFromUrl(url, SLACK_TOKEN);
      if (!originalMessage) {
        console.log('nothing originalMessage'); // 元メッセージが取得できない場合のログ
        return;
      }

      console.log(originalMessage); // デバッグ用
      const posterId = originalMessage.user; // 元メッセージの投稿者ID
      if (!results[posterId]) {
        results[posterId] = {};
      }

      const reactions = originalMessage.reactions || [];
      reactions.forEach((reaction) => {
        if (MVV_REACTIONS.includes(reaction.name)) {
          results[posterId][reaction.name] = (results[posterId][reaction.name] || 0) + reaction.count;
        }
      });
    });
  }

  const userNames = fetchUserNames(SLACK_TOKEN);
  exportToSheet(sheetName, results, userNames);
}

/**
 * 環境変数からSlackトークンを取得
 */
function getSlackToken() {
  const properties = PropertiesService.getScriptProperties();
  return properties.getProperty("SLACK_TOKEN");
}

/**
 * Slack APIリクエストのヘルパー関数
 * レート制限に対応し、必要に応じてリトライ処理を行う
 */
function fetchWithRateLimit(url, options) {
  while (true) {
    try {
      const response = UrlFetchApp.fetch(url, options);
      const jsonResponse = JSON.parse(response.getContentText());

      if (jsonResponse.ok) {
        return jsonResponse; // 成功した場合
      } else if (jsonResponse.error === "ratelimited") {
        // レート制限エラー
        const retryAfter = parseInt(response.getHeaders()["Retry-After"], 10) || 1;
        console.warn(`Rate limited. Retrying after ${retryAfter} seconds...`); // レート制限時のログ
        Utilities.sleep(retryAfter * 1000); // 指定された秒数だけ待機
      } else {
        console.error(`Slack API Error: ${jsonResponse.error}`); // その他のエラー
        return null;
      }
    } catch (e) {
      console.error(`Fetch error: ${e.message}`); // リクエスト自体のエラー
      return null;
    }
  }
}

/**
 * 指定期間のメッセージを取得し、元メッセージのURLを返す
 */
function fetchMessagesWithUrls(channelId, start, end, SLACK_TOKEN) {
  const messages = [];
  let cursor = null;

  do {
    const response = fetchSlackMessages(channelId, cursor, SLACK_TOKEN);

    if (response.messages) {
      response.messages.forEach((message) => {
        const tsDate = new Date(Number(message.ts) * 1000);
        if (tsDate >= new Date(start) && tsDate <= new Date(end)) {
          console.log(message.text); // メッセージテキストのログ
          const urls = extractUrlsFromMessage(message.text);
          messages.push(...urls); // メッセージ内のURLを収集
        }
      });
    }
    cursor = response.response_metadata ? response.response_metadata.next_cursor : null; // 次ページのカーソル
  } while (cursor);

  return messages;
}

/**
 * URLから返信メッセージを取得（スレッド対応）
 */
function fetchOriginalMessageFromUrl(url, SLACK_TOKEN) {
  const matches = url.match(/\/archives\/([A-Z0-9]+)\/p(\d+)(\?thread_ts=(\d+\.\d+))?/);
  if (!matches) return null;

  const channelId = matches[1]; // チャンネルID
  const ts = `${matches[2].slice(0, 10)}.${matches[2].slice(10)}`; // メッセージのTS
  const threadTs = matches[4] || ts; // スレッドTS（なければ通常TS）

  const apiUrl = `https://slack.com/api/conversations.replies?channel=${channelId}&ts=${threadTs}`;
  const options = {
    method: "get",
    headers: {
      Authorization: `Bearer ${SLACK_TOKEN}`,
    },
  };

  const jsonResponse = fetchWithRateLimit(apiUrl, options);
  if (!jsonResponse) return null;

  // スレッドの中で、指定されたTSに一致するメッセージ（返信メッセージ）を返す
  return jsonResponse.messages.find((msg) => msg.ts === ts) || null;
}

/**
 * Slack APIでチャンネルメッセージを取得
 */
function fetchSlackMessages(channelId, cursor, SLACK_TOKEN) {
  const url = `https://slack.com/api/conversations.history?channel=${channelId}&limit=100${cursor ? "&cursor=" + cursor : ""}`;
  const options = {
    method: "get",
    headers: {
      Authorization: `Bearer ${SLACK_TOKEN}`,
    },
  };

  return fetchWithRateLimit(url, options);
}

/**
 * メッセージテキストからURLを抽出
 */
function extractUrlsFromMessage(text) {
  const urlRegex = /https:\/\/[^\s]+/g;
  return text.match(urlRegex) || [];
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
 * 集計結果をスプレッドシートにエクスポート
 */
function exportToSheet(sheetName, results, userNames) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  } else {
    sheet.clear(); // 既存のデータをクリア
  }

  // ヘッダー
  const headers = ["なまえ", ...MVV_REACTIONS];
  sheet.appendRow(headers);

  // データ行
  for (const [userId, reactions] of Object.entries(results)) {
    const userName = userNames[userId] || "Unknown";
    const row = [userName, ...MVV_REACTIONS.map((reaction) => reactions[reaction] || 0)];
    sheet.appendRow(row);
  }
}
```

## 装飾して周知しましょう！

スライドこんな感じ😁✨

![alt text](/assets/images/20241216/image-1.png)

## さいごに

今回はスタンプを受けた人を表彰していますが、送った人もValueを日々意識して業務にあたっているので年一くらいでランキング集計して賞賛したいなと考えています！

それでは素敵なSlack、MVVライフを！


