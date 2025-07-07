---
title: "Selenium IDEでループ処理を行う"
categories:
  - blog
tags:
  - Selenium
  - SeleniumIDE

---

## はじめに  
  
Selenium IDEのみではループ処理が出来ないため、同じ処理を繰り返し行いたいときにとても不便です。  
  
この記事ではループできるようにする方法と簡単なサンプルについて書きます。  
  
※かなり今更な内容ですが、たまにやろうとしたときに忘れてるのでメモ。  
  
## ループできるようにする  
  
拡張jsやアドオン追加でループできるようになります。  
  
今回はsideflow.jsを使いました。  
  
### sideflow.js  
  
拡張用のjsファイルです。  
  
https://github.com/73rhodes/sideflow  
からダウンロード  
  
Selenium IDEのオプション→設定→一般タブ  
『Selenium Core拡張スクリプト（user-extentions.js）のパス』にダウンロードしたsideflow.jsを指定  
  
これでforやwhileのループが使えます。  
  
### SelBlocks  
  
アドオンなのでインストールが簡単そうなのですが、署名エラーにより有効にできなかったので諦めました。  
https://addons.mozilla.org/en-US/firefox/addon/selenium-ide-sel-blocks/  
  
  
## ループのサンプル  
  
URLが異なるページでなにかしら処理をするサンプルです。  
  
<table>  
<tr>  
	<th>コマンド</th>  
	<th>対象</th>  
	<th>値</th>  
	<th>※解説</th>  
</tr>  
  
<tr>  
	<td>for</td>  
	<td>i=1; i &lt;= 10; i++</td>  
	<td>i</td>  
	<td>ループの開始。10回ループ。値をiに格納</td>  
</tr>  
<tr>  
	<td>echo</td>  
	<td>${i}</td>  
	<td></td>  
	<td>ただのデバッグ（SeleniumIDEの『ログ』タブに表示されるよ）</td>  
</tr>  
<tr>  
	<td>open</td>  
	<td>http://qiita.com/tags/SeleniumIDE/items?page=${i}</td>  
	<td></td>  
	<td>URLを開く。${i}が変数</td>  
</tr>  
<tr>  
	<td>pause</td>  
	<td>3000</td>  
	<td></td>  
	<td>3秒待つ（いつもwaitかsleepか悩むのでメモ...）</td>  
</tr>  
<tr>  
	<td>assertTextPresent</td>  
	<td>SeleniumIDE</td>  
	<td></td>  
	<td>ページのどこかに『SeleniumIDE』と表示されているか確認</td>  
</tr>  
<tr>  
	<td>endFor</td>  
	<td></td>  
	<td></td>  
	<td>ループの終了</td>  
</tr>  
</table>  
  
## さいごに  
  
Selenium IDE便利ですね。ステキです。  
