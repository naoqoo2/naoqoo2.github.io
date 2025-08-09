---
title: "Claude CodeでShift+Enterで改行するための設定方法"
categories:
  - blog
tags:
  - Claude Code
  - ターミナル
  - 改行

---

Claude Codeを使っていて「Shift+Enterで改行したいのに送信されてしまう！」と困ったりしていませんか？

解決方法を見つけたのでシェアします。

## 問題

Claude CodeでShift+Enterを押すと、期待していた改行ではなくメッセージが送信されてしまう

## 解決方法

Claude Code内で以下のコマンドを実行するだけ！

```
/terminal-setup
```

これで、VSCodeターミナルやiTerm2でShift+Enterによる改行が使えるようになります。

## その他の改行方法

`/terminal-setup`が使えない環境では、以下の代替方法もあります：

- `\` + `Enter`：すべてのターミナルで動作
- `Option + Enter`：macOSの場合

## まとめ

Claude Codeで改行に困ったら`/terminal-setup`を実行！これだけで快適な開発環境が手に入ります。

参考：[Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code/interactive-mode)