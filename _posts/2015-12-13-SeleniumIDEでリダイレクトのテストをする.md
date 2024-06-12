---
title: "SeleniumIDEでリダイレクトのテストをする"
categories:
  - blog
tags:
  - Selenium
  - SeleniumIDE

---

# はじめに  
みなさん、リダイレクトのテストどうやってますか？  
  
静的なHTMLページを動的システムに乗せかえたり、古いシステムのリプレイスなどでURLが変わることありますよね。  
でも、ページランクは引き継ぎたいので『旧URL→新URLへ301リダイレクトしよう』というのは結構あるあるかと思います。  
  
数ページであればブラウザに旧URLを貼って、新URLに飛ぶこと確認してOKとなりますが、  
対象ページが数100～存在したりすると全部見るのは大変・・・。  
ましてや開発環境、ステージング、本番と環境毎に確認するとなると涙が出てきますよね？  
  
そんな時、私はSelenium IDEを使ってテストしています。  
  
# Selenium IDEとは  
Selenium IDEって何？という人はこちら。  
[5分でわかるSelenium IDEの使い方](http://qiita.com/naoqoo2/items/90d382cd9370d3526509)  
  
# テストケースはこんな感じ  
  
<table>  
<tr>  
	<th></th>  
	<th>コマンド</th>  
	<th>対象</th>  
	<th>値</th>  
</tr>  
<tr>  
	<td>1</td>  
	<td>store</td>  
	<td>【旧URLのドメイン】</td>  
	<td>before</td>  
</tr>  
	<td>2</td>  
	<td>store</td>  
	<td>【新URLのドメイン】</td>  
	<td>after</td>  
</tr>  
<tr>  
	<td>3</td>  
	<td>open</td>  
	<td>${before}【旧URLのパス】</td>  
	<td></td>  
</tr>  
<tr>  
	<td>4</td>  
	<td>assertLocation</td>  
	<td>${after}【新URLのパス】</td>  
	<td></td>  
</tr>  
</tbody></table>  
  
### 解説  
1,2：旧と新のドメイン部分を変数に格納してます。環境毎にテストする際はここを書き換えるだけ。  
3：openでURLにアクセスします。  
4：3でopenしたあとリダイレクトしているはずなのでassertLocationでリダイレクト先URLが正しいかを判定。  
※あとは3,4をコピペしてリダイレクト対象分増やせばOK。（Excelやプログラム組むなど工夫して作るとGood!!）  
  
# サンプル  
百聞は一見に如かず ということで実際にやってみましょう。  
ここでは「短縮URL→Qiita記事URLにリダイレクト」を例にします。（旧→新のいいサンプルがなかったので…）  
  
* http://goo.gl/hmegpd  
→ http://qiita.com/naoqoo2/items/413dfa0aa01e9f294c53  
* http://goo.gl/MQq30f  
→ http://qiita.com/naoqoo2/items/90d382cd9370d3526509  
* http://goo.gl/PcvbKP  
→ http://qiita.com/naoqoo2/items/bb02d790be8fd7fe6554  
  
の3つのリダイレクトをテストしますよ。  
下記をコピーしてテキスト保存してSeleniumIDEのテストケースを開くで試してみてください。  
  


```html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head profile="http://selenium-ide.openqa.org/profiles/test-case">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="selenium.base" href="" />
<title>sample</title>
</head>
<body>
<table cellpadding="1" cellspacing="1" border="1">
<thead>
<tr><td rowspan="1" colspan="3">sample</td></tr>
</thead><tbody>
<tr>
	<td>store</td>
	<td>http://goo.gl</td>
	<td>before</td>
</tr>
<tr>
	<td>store</td>
	<td>http://qiita.com</td>
	<td>after</td>
</tr>
<tr>
	<td>open</td>
	<td>${before}/hmegpd</td>
	<td></td>
</tr>
<tr>
	<td>assertLocation</td>
	<td>${after}/naoqoo2/items/413dfa0aa01e9f294c53</td>
	<td></td>
</tr>
<tr>
	<td>open</td>
	<td>${before}/MQq30f</td>
	<td></td>
</tr>
<tr>
	<td>assertLocation</td>
	<td>${after}/naoqoo2/items/90d382cd9370d3526509</td>
	<td></td>
</tr>
<tr>
    <td>open</td>
    <td>${before}/PcvbKP</td>
    <td></td>
</tr>
<tr>
    <td>assertLocation</td>
    <td>${after}/naoqoo2/items/bb02d790be8fd7fe6554</td>
    <td></td>
</tr>
</tbody></table>
</body>
</html>

```

# さいごに  
いかがでしたでしょうか？  
これでブラウザに直接URLを貼り付ける面倒なテストとはおさらばです。  
コーヒーでも飲みながらブラウザが自動でテスト完了してくれるのを優雅に待ちましょう。  
  
それではステキなSeleniumIDEライフを。  
  
