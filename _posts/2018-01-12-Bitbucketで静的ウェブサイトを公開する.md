---
title: "Bitbucketで静的ウェブサイトを公開する"
categories:
  - blog
tags:
  - HTML
  - Bitbucket
  - 初心者
  - 新人プログラマ応援

---

## はじめに  
  
知ってる人も多いと思いますが、Bitbucketで静的ページを公開することが可能です。  
一つのアカウントで一つのサイトしか公開できないと思われがちですが、チームを作ればいくつでも公開可能です。（これは知らない人多そう！）  
手順も簡単。やってみましょう。  
  
※URLはSSL対応されてドメインは『～.io』となっています。  
ググると『～.org』で作る記事が多くヒットしますが古い情報なので注意（非SSL時代）  
  
## 手順  
  
### 1. チームを作る  
  
まずはチーム作成画面でチームを作りましょう。チーム名がサブドメインになります。  
※DNS標準で受け入れられるものでなければなりません。大文字と特殊文字（アンダースコアなど）は使わないこと！  
  
- チーム名: hellosample  
  
![ダウンロード.png](/assets/images/20180112/2a243d93-e215-edff-2d06-dd020728a4eb.png)  
  
### 2. リポジトリを作る  
  
次にリポジトリを作ります。リポジトリ名は`{チーム名}.bitbucket.io`とする必要があります。  
  
- プロジェクト名: hellosample（なんでもOK。ここではチーム名と同じにしました）  
- リポジトリ名: hellosample.bitbucket.io  
  
![ダウンロード (2).png](/assets/images/20180112/4618b93b-9e6d-8776-6f8c-8b914634fa3a.png)  
  
### 3. index.htmlを作ってみる  
  
リポジトリが作成できたらindex.htmlを作ってみましょう。  
~~cloneがめんどうなので~~ Bitbucket上で『README の作成』を押してサクッと作ってみます。  
  
![ダウンロード (1).png](/assets/images/20180112/57682bf9-de1d-9d42-464e-b8c0e6b6763e.png)  
  
- ファイル名: README.md→index.htmlに変更  
- 内容: hello sample!（なんでもOK。日本語の場合はタグしっかりかかないと文字化ける可能性あるのでビックリしないこと）  
  
![ダウンロード (3).png](/assets/images/20180112/387275be-5b11-870c-29bd-7fd4f5970921.png)  
  
### 4. アクセスしてみる  
  
`https://{チーム名}.bitbucket.io/`にアクセスしてみましょう。ウェブサイトとして公開されているはずです。  
  
- https://hellosample.bitbucket.io/  
    - hello sample!と表示されていればOK！  
  
あとはよしなに！  
  
## 参考  
  
- [Publishing a Website on Bitbucket Cloud(公式)](https://confluence.atlassian.com/bitbucket/publishing-a-website-on-bitbucket-cloud-221449776.html)  
  
  
  
