---
title: "【Laravel】attachとsyncWithoutDetachingの使い分け"
categories:
  - blog
tags:
  - Laravel

---

## はじめに  
多対多のリレーションで関連付けたいときは`attach`!と覚えていたのですが  
中間テーブルにユニーク制約を貼ってる場合に`attach`を連続で実行してしまうとエラーになる。。  
（ユニーク制約がなければ同一レコードが複数できる）  
うーん、困った。  
そんなときは`syncWithoutDetaching` を使いましょう。  
  
## 挙動の違い  
  
- `attach`  
    - 常にinsert  
- `syncWithoutDetaching`  
    - なければinsert、あれば何もしない  
  
ということで、AとBの関係性が  
- 複数あり得る場合は`attach`  
- 最大1つの場合は`syncWithoutDetaching`  
  
が良いよ！  
  
[公式のサンプル](https://readouble.com/laravel/8.x/ja/eloquent-relationships.html?header=%25E9%2596%25A2%25E9%2580%25A3%25E3%2581%25AE%25E5%2590%258C%25E6%259C%259F#attaching-detaching)ではユーザーにロールを与える際に`attach`をしていますが  
一人のユーザーに同じ権限を複数与える（Aさんにadmin権限2個）といったことはないので  
`syncWithoutDetaching` がオススメ。  
  
  
## attachの使い所  
  
- 買い物カゴに商品を入れる  
    - 同じ商品を複数入れる可能性があるため  
- （パッと思い付かないな）  
  
## syncWithoutDetachingの使い所  
  
- 商品をお気に入り登録する  
- ユーザーにロールを与える  
