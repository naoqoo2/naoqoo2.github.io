---
title: "Selenium IDEのTips"
categories:
  - blog
tags:
  - SeleniumIDE

---

久々に新しくなったSelenium IDEを触りました。  
https://github.com/SeleniumHQ/selenium-ide  
chromeで使えていい感じですね。まだ試してないですがデフォルトでif文とかもできるようになったそうな。  
  
ここではちょっとしたテクニックを記載します。（随時追加予定）  
  
## コマンド系  
  
### 現在日時を使う  
  
テストデータにユニークな名称を付けたいときや、期間などを扱う時に重宝します。  
  
まず、扱いやすいように日付関数を宣言。  
  
| Command | Target | Value |  
|:---|:---|:---|  
|execute script|※1をコピペ||  
  
**※1**  

```js
getDateTime = function(format, add_day){if (format == null) format = null;if (add_day == null) add_day = 0;var obj = {};var dt = new Date();dt.setTime(dt.getTime() + add_day * 60*1000*60*24);var week_jp = ['日','月','火','水','木','金','土'];obj.Y = dt.getFullYear();obj.m = ('0'+(dt.getMonth() + 1)).slice(-2);obj.n = dt.getMonth() + 1;obj.d = ('0'+dt.getDate()).slice(-2);obj.j = dt.getDate();obj.H = ('0'+dt.getHours()).slice(-2);obj.G = dt.getHours();obj.i = ('0'+dt.getMinutes()).slice(-2);obj.s = ('0'+dt.getSeconds()).slice(-2);obj.w = dt.getDay();obj.w_jp = week_jp[dt.getDay()];if(format != null){var str = format;str = str.replace('w_jp', obj.w_jp);str = str.replace('Y', obj.Y);str = str.replace('m', obj.m);str = str.replace('n', obj.n);str = str.replace('d', obj.d);str = str.replace('j', obj.j);str = str.replace('H', obj.H);str = str.replace('G', obj.G);str = str.replace('i', obj.i);str = str.replace('s', obj.s);str = str.replace('w', obj.w);return str;}else{return obj;}};
```

用途に応じて様々なフォーマットで。  
[JavaScriptで現在日から前後x日を取得する](https://naoqoo2.com/20151009-JavaScriptで現在日から前後x日を取得する.md#%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89)のワンライナーなので詳しくはこちらを参照ください。  
  
下記は一例。  
  
| Command | Target | Value |  
|:---|:---|:---|  
|execute script|return getDateTime('Ymd');|date|  
|execute script|return getDateTime('Y/m/d H:i:s');|datetime|  
  
それぞれ`${date}`、`${datetime}`で使えます。  
  
### 属性値を変数に格納する  
  
画面からURLを取得したいときなど。  
（別ウィンドウで開く系は操作が難しくなるので、URL取得してopenコマンドで開くをよくやります）  
  
| Command | Target | Value |  
|:---|:---|:---|  
|store attribute|xpath=//div/div/a@href|url|  
  
### 変数を使う  
  
`${hoge}`の形式で使えます。文字列連結なども不要。  
  
| Command | Target | Value |  
|:---|:---|:---|  
|open|${url}|  
|open|example.com?id=${id}|  
  
  
## 全般  
  
### プロジェクト保存時はファイル拡張子を「.side」にする  
  
保存しようとするとなぜかデフォルト「.txt」なのですが、このまま保存しても開けないので「.side」に変更しましょう。  
  
  
### 1つのテストスイートに同じテストケースを複数入れる  
  
UI上からはテストスイートの中に同じテストケースを複数回実行することはできませんが、プロジェクトファイルを直接編集すれば可能です。  
  
```sample.side
  "suites": [{
    ：
    ：
    "tests": ["43a345b3-5cdc-2b31-eb4c-41a345bfd231"]
  }, {

↓ testsを直接増やす

    "tests": ["43a345b3-5cdc-2b31-eb4c-41a345bfd231", "43a345b3-5cdc-2b31-eb4c-41a345bfd231"]

```

  
同じテストケースを実行したいときなんてあるの？と思うかもしれませんが、例えば下記のようなテストケース★の場合です。  
  
- 在庫の増減（testsuite）  
    - 在庫が3であること★  
    - 在庫を1減らす  
    - 在庫を1増やす  
    - 在庫が3であること★  
  
### ダブルクリックした行（コマンド）だけ実行したい  
  
テストケース作るとき確認のため旧SeleniumIDE時代よくやってたのですが、  
新になって、できる時とできない時がある。。。なぜ？？  
（どなたかご存知の方いましたら教えてください）  
  
