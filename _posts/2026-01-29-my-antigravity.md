---
title: "俺のAntigravity"
categories:
  - blog
tags:
  - Antigravity
  - 俺の
---

GoogleのAIエージェント「Antigravity」のショートカットや設定方法を忘れないようにまとめます。

# ショートカット

## エージェントマネージャーへの切り替え

`Ctrl + E`

メイン ウィンドウ Editor と Agent Manager を切り替えます。

## 設定画面へ

エージェントマネージャーで

`Ctrl + ,`

設定を変更したい時に素早くアクセスできます。

# 設定

## Auto-continue = ON

生成が途切れた時に、自動で「続き（Continue）」をしてくれる設定です。
長いコードを生成している時などに、途中で止まってしまうのを防いでくれます。

## Enable Terminal Sandbox = ON

ターミナルコマンドをサンドボックス環境で実行する設定です。
ローカル環境（macOS）への影響を抑え、安全にコマンドを実行させるためにONにしておきます。

## Sandbox Allow Network = ON

サンドボックス内でネットワークリクエストを許可する設定です。
これがOFFだと、`npm install` や外部APIへのアクセスなどが失敗してしまうため、基本的にはONにしておきます。

