---
title: "gitの改行コード自動変換でハマッた話（WindowsでもLFでチェックアウトする方法）"
categories:
  - blog
tags:
  - Git
  - 改行コード

---

わたくし、  
gitの改行コード自動変換（Windows環境ならCRLFにする）というのが嫌いで  
リポジトリにコミットされてる改行コードのままクローンされるよう下記設定をいれてます。  
>core.autocrlf=false（改行コード変換しない）  
  
  
ある日、  
とあるリポジトリをクローンしたところ  
改行コードがCRLFになってる。。  
  
てっきりCRLFでコミットされてしまってるんだなと思ったのですが、  
実は下記ファイルが原因でした。  
  
  
**.gitattributes**  

```text
* text=auto
```

>これはGitがテキストであると考えているすべてのファイルがリポジトリに>（LF）改行コードを正規化していることが保証されます。  
>　引用（翻訳版）：http://git-scm.com/docs/gitattributes  
  
  
ということで、リポジトリ上は全てLFで問題なかったのです。  
  
が、このファイルがコミットされていると、  
core.autocrlfの設定を無視してCRLFに変換してくれるようです。  
  
ややこしや。  
時代ですかね。  
  
## 追記（2019/8/29）  
  
どうしてもWindowsでもLFで管理したい！と思い久々に調べました。  
  
すると[こんなstack overflow](https://stackoverflow.com/questions/2517190/how-do-i-force-git-to-use-lf-instead-of-crlf-under-windows/33424884#33424884)が！  
  
```
git config --global core.eol lf
git config --global core.autocrlf input
```

この設定で自動変換されずLFでチェックアウトできました！  
`* text=auto`の設定があっても問題なし！  
  
既にチェックアウト済みの既存のレポジトリは下記コマンドで修正できるぜ！  
  
```
git rm -rf --cached .
git reset --hard HEAD
```

的なことが書いてあったのですが、残念ながらCRLFのままでした。でもまぁcloneし直して解決！  
  
これでモヤモヤとサヨナラです。ありがとうGit！  
