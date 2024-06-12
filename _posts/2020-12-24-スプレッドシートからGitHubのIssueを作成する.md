---
title: "スプレッドシートからGitHubのIssueを作成する"
categories:
  - blog
tags:
  - GitHub
  - GoogleAppsScript
  - GAS
  - spreadsheet

---

これは[SOUSEI Technology アドベントカレンダー2020](https://qiita.com/advent-calendar/2020/st) 24日目の記事です。  
メリークリスマスイブ :santa:  
  
## はじめに  
スプレッドシートからIssueを作りたいこと、あるよねー！  
ということでGASで。  
  
## やり方  
  
1. 行を選択する（複数行OK）  
2. GAS→Issueを作成する  
3. OK押す  
![capture.gif](/assets/images/20201224/471593ff-4581-96cb-48fa-17d06e40e957.gif)  
  
  
  
  
## スクリプト  
  
こちらをスプレッドシートのGASにコピペして `{$_〇〇}` 部分を書き換えてください。  
アクセストークンは[公式ドキュメント](https://docs.github.com/ja/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token)を参考に作りましょう！  
  
```js
function makeIssues() {

  // GitHubの情報
  var OWNER = "{$_GitHubのアカウント名}";
  var REPO = "{$_Issueを作成するリポジトリ名}";
  var ACCESS_TOKEN = "{$_アクセストークン}";
  
  // スプレッドシートの情報
  var title_column_no = 1;
  var description_column_no = 2;
  var issue_url_column_no = 3;
  
  // 選択しているセルの開始行番号を取得
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var upper_left_cell = sheet.getActiveCell();
  var start_row = upper_left_cell.getRow();

  // 選択しているセルの行数を取得
  var range = SpreadsheetApp.getActiveRange();
  var rows = range.getNumRows();

  // 確認ダイアログ
  var message = '';
  var start_title = sheet.getRange(start_row, title_column_no).getValue();
  message += start_title;
  if (rows > 1) {
    message += ' など' + rows + '行';
  }
  var result = Browser.msgBox('Issueを作成します。よろしいですか？', message, Browser.Buttons.OK_CANCEL);

  if (result == 'cancel') {
    return;
  }

  // Issue作成
  for (var i = 0; i < rows; i++) {
    var row = start_row + i;
    var title = sheet.getRange(row, title_column_no).getValue();
    var description = sheet.getRange(row, description_column_no).getValue();

    var payload = {
      "title": title,
      "body": description,
    };

    var response_data = createIssue(payload);
    sheet.getRange(row, issue_url_column_no).setValue(response_data['html_url']);
  }

  function createIssue(payload) {
    var url = "https://api.github.com/repos/"+ OWNER + "/" + REPO + "/issues";
    
    var header = {
      "Authorization": "Basic " + Utilities.base64Encode(ACCESS_TOKEN),
      "Accept": "application/vnd.github.symmetra-preview+json",
      "Content-Type": "application/json",
    };
    
    var options = {
      "method" : "post",
      "payload" : JSON.stringify(payload),
      "headers" : header,
    };
    
    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response);
    var response_data = JSON.parse(response.getContentText());
    return response_data;
  }
}

function onOpen() {
  // メニューバーにカスタムメニューを追加
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {name : "Issueを作成する", functionName : "makeIssues"},
  ];
  spreadsheet.addMenu("GAS", entries);
}

```

## さいごに  
  
- [スプレッドシートからTrelloのカードを作成](https://naoqoo2.github.io/20180402-スプレッドシートからTrelloにカード追加する（任意の行だけ選択可能）.md)  
- [Trelloからスプレッドシートに転記](https://naoqoo2.github.io/20201210-Trelloからスプレッドシートに転記する.md)  
  
もよければどうぞ😎  
