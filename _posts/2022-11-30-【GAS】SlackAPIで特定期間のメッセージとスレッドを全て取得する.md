---
title: "【GAS】SlackAPIで特定期間のメッセージとスレッドを全て取得する"
categories:
  - blog
tags:
  - GAS
  - slack-api

---

オー！📣 にーっぽーん！🇯🇵⚽️🇪🇸  
  
これは [株式会社マイホム Advent Calendar 2022](https://qiita.com/advent-calendar/2022/myhm) 1日目の記事です✨  
  
## はじめに  
こんにちはGAS兄です😃  
  
Slackで特定期間のメッセージを全て取得したいとき、あるよね！！  
ということでやっていきましょう。  
  
## API仕様  
  
以前は `channels.history` でメッセージとスレッド両方取得できていたそうなのですが、廃止になってしまったそうで、  
現在はメッセージを`conversations.history`、スレッドを`conversations.replies`でそれぞれ取得する必要があります。  
ただし下記のようなクセがあり、重複除外してあげる必要があります。  
  
- `conversations.replies`  
    - スレッドの親となったメッセージも含まれる  
- `conversations.history`  
    - スレッド内で「チャンネルにも投稿する」にチェックしたものも含まれる  
  
期間はoldestとlatestパラメータで指定可能。  
また、1度に取得できる件数にはlimit上限があるので、全て取得するには何回か叩かないといけません。  
あとは1分間に50回までの制限があったりします。  
  
## GAS  
  
ということでソースコードいってみましょう！ドーン💥  
  
まずはチャンネル取得して  
チャンネルごとにメッセージ取得して  
スレッド持つメッセージならスレッドも取得して〜  
みたいなことをやっています。  
  
**例) run()を実行して2022年12月の全メッセージを取得**  

```js
var API_TOKEN = "ここにAPIトークンを";
var DATE_FROM = '2022/12/01';
var DATE_TO = '2023/01/01';

function run() {
  var timestamp_from = getTimestamp(DATE_FROM);
  var timestamp_to = getTimestamp(DATE_TO);

  // チャンネル取得（これも期間で絞れたらいいのだけど、、、）
  var channels = getChannels();
  console.log('channels count:' + channels.length);
  channels.forEach(function(ch) {
    // メッセージ取得
    var messages = getMessages(ch.id, timestamp_from, timestamp_to);
    console.log('messages count:' + messages.length);

    messages.forEach(function(message) {
      // スレッドのあるメッセージの場合
      if (message.thread_ts) {
        // チャンネルにも投稿したものは重複してしまうのでスキップする
        if (message.subtype == 'thread_broadcast') {
          // continue;
          return;
        }
        var thread_messages = getReplies(ch.id, message.thread_ts, timestamp_from, timestamp_to);
        thread_messages.forEach(function(thread_message) {
          messageAnalysis(thread_message);
        });
      } else {
        // elseで処理してる理由：スレッドがある場合はgetRepliesで親メッセージも取得できるため、重複しないように。
        messageAnalysis(message);
      }
    });
  });
}

function getTimestamp(date) {
  var ms = new Date(date).getTime();
  // 単位をms→sに変換
  var s = ms / 1000;
  return s;
}

function getChannels(channels, next_cursor) {
  if (!channels) {
    channels = [];
  }

  var param = [];
  if (next_cursor) {
    param['cursor'] = next_cursor;
  }

  var resp = callSlackAPI('conversations.list', param);
  channels = channels.concat(resp.channels);
  if (resp.response_metadata && resp.response_metadata.next_cursor) {
    channels = getChannels(channels, resp.response_metadata.next_cursor);
  }
  return channels;
}

function getMessages(ch_id, timestamp_from, timestamp_to, messages, next_cursor) {
  if (!messages) {
    messages = [];
  }

  var param = [];
  param['limit'] = 1000;
  param['channel'] = ch_id;
  param['oldest'] = timestamp_from;
  param['latest'] = timestamp_to;
  if (next_cursor) {
    param['cursor'] = next_cursor;
  }

  var resp = callSlackAPI('conversations.history', param);
  messages = messages.concat(resp.messages);
  if (resp.response_metadata && resp.response_metadata.next_cursor) {
    messages = getMessages(ch_id, timestamp_from, timestamp_to, messages, resp.response_metadata.next_cursor);
  }
  return messages;
}

function getReplies(ch_id, thread_ts, timestamp_from, timestamp_to, messages, next_cursor) {
  if (!messages) {
    messages = [];
  }

  var param = [];
  param['limit'] = 1000;
  param['channel'] = ch_id;
  param['ts'] = thread_ts;
  param['oldest'] = timestamp_from;
  param['latest'] = timestamp_to;
  if (next_cursor) {
    param['cursor'] = next_cursor;
  }

  var resp = callSlackAPI('conversations.replies', param);
  messages = messages.concat(resp.messages);
  if (resp.response_metadata && resp.response_metadata.next_cursor) {
    messages = getReplies(ch_id, thread_ts, timestamp_from, timestamp_to, messages, resp.response_metadata.next_cursor);
  }
  return messages;
}

function callSlackAPI(path, params) {

  // メッセージ取得系のSlackAPIの制限が1分間で50回までなので、超えないようにスリープする
  Utilities.sleep(1100);

  if (params === void 0) { params = {}; }
  var url = "https://slack.com/api/" + path + "?";
  var qparams = [];
  for (var k in params) {
      qparams.push(encodeURIComponent(k) + "=" + encodeURIComponent(params[k]));
  }
  url += qparams.join('&');
  console.log(url);
  var headers = {
    'Authorization': 'Bearer '+ API_TOKEN
  };
  var options = {
    'headers': headers
  };
  var resp = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(resp.getContentText());
  if (data.error) {
    throw "Error " + path + ": " + data.error;
  }
  return data;
}

function messageAnalysis(message) {
  // メッセージに対して処理したいことをここに書く。
}
```

  
## おわりに  
  
これでメッセージが取得できたので、解析がはかどりますね！  
それではステキなSlackライフを。  
  
ちなみにGASはスクリプト実行可能時間6分までの上限があるため（試したら30分まではいけた）、あまり長い期間を指定するとタイムアウトエラーとなってしまいます。てへ😉  
  
  
