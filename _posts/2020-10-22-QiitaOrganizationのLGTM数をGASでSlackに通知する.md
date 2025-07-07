---
title: "QiitaOrganizationのLGTM数をGASでSlackに通知する"
categories:
  - blog
tags:
  - Qiita
  - GAS
  - Slack
  - Organization
  - LGTM

---

## やったこと  
  
QiitaOrganizationのページからLGTM数を取得して  
  
![image.png](/assets/images/20201022/0764fbe8-966a-2d2a-fac1-1c2c3ac3beb9.png)  
  
こんな感じで毎週Slackに通知。  
  
![image.png](/assets/images/20201022/f3bff1f2-960d-a4fe-0b93-341725078c51.png)  
  
## なぜやったのか  
  
- 社内でQiitaを盛り上げたい、関心UP  
- 投稿へのモチベーションUP  
- いっぱい投稿が増えるといいな  
  
  
## 実装メモ  
  
- LGTM数は[feed](/feed subscribe https://qiita.com/organizations/sousei-tech/activities.atom)に含まれてなかったのでスクレイピングで取得  
    - なぜかスクレイピングするとLGTMの後ろにsがつくっぽい。これは未解決。  
- Slack通知はIncoming Webhookを使用  
    - 設定こんな感じ ![image.png](/assets/images/20201022/1edd93b9-0a99-a7af-5676-c6e63e46634a.png)  
- LGTM数はスプレッドシートに記録される  
    - こんな感じで日付とLGTM数が溜まっていく ![image.png](/assets/images/20201022/5c1cab69-0e1f-433a-1e8e-5e678449eb14.png)  
  
- 毎週実行はGASのトリガーでやってる。  
  
## コード（GAS）  
  
スプレッドシートからツール→スクリプトエディタを開く。  
下記をコピペしてurlとwebhook_urlを書き換えればOK。  
  
```
function notifyContributions() {
  const url = 'QiitaOrganizationのURL'; // 例： https://qiita.com/organizations/sousei-tech
  const webhook_url = "Incoming WebhookのURL"; // 例）https://hooks.slack.com/services/HOGE/FUGA/HOGA

  const response = UrlFetchApp.fetch(url);
  const html = response.getContentText();
  
  let contributions;
  // NOTE: HTML構成変わると動かなくなる。そのときはwebページをソース表示して該当箇所のHTMLを見つけて修正する。
  // NOTE: 2020/3/10時点 "likesCount":1096,
  const targetLeft = '"likesCount":';
  const targetRight = ',';
  let index = html.indexOf(targetLeft)
  // Logger.log(index);
  if (index !== -1) {
    let tmp = html.substring(index + targetLeft.length);
    index = tmp.indexOf(targetRight);
    if (index !== -1) {
      contributions = tmp.substring(0, index);
    }
  }
  
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName("シート1");

  const last_row = sheet.getDataRange().getLastRow();
  const before_contributions = sheet.getRange(last_row, 2).getValue();
  const target_row = last_row + 1;
  sheet.getRange(target_row, 1).setValue(new Date());
  sheet.getRange(target_row, 2).setValue(contributions);
  // Logger.log(before_contributions);
  
  const message = contributions + ' LGTM :tada: （前回から+' + (contributions - before_contributions) + '）' + "\n" + url;
  
// エラーで動かなくなったときはここでリターンして調査するとよい。(Slackへの通知をやめる)
//  Logger.log(contributions);
//  return;

  const jsonData = {
    "text" : message,
    "link_names" : 1,
  };
  const payload = JSON.stringify(jsonData);  
  const options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload,
  };
  UrlFetchApp.fetch(webhook_url, options);
```

## おまけ  
  
社員の投稿を通知したい場合はslackでfeedを購読しておけばOK！（これもGASで実装しようかと思っていた😅）  
`/feed subscribe https://qiita.com/organizations/sousei-tech/activities.atom`  
  
## さいごに  
  
それではステキなQiitaOrganizationライフを。  
