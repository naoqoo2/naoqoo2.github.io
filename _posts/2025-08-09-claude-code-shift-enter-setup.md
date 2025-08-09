---
title: "Claude CodeでShift+Enterで改行するための設定方法"
categories:
  - blog
tags:
  - Claude Code
  - ターミナル
  - 改行

---

Claude Codeを使っていて「Shift+Enterで改行したいのに送信されてしまう！」という経験はありませんか？

私もついさっき同じ問題に遭遇して、解決方法を見つけたのでシェアします。

## 問題

Claude CodeでShift+Enterを押すと、期待していた改行ではなくメッセージが送信されてしまう問題が発生していました。

## 解決方法

とても簡単です。Claude Code内で以下のコマンドを実行するだけ！

```
/terminal-setup
```

実行すると、以下のような出力が表示されます：

```
Installed VSCode terminal Shift+Enter key binding
See /Users/nao/Library/Application Support/Code/User/keybindings.json
```

これで、VSCodeターミナルやiTerm2でShift+Enterによる改行が使えるようになります。

## その他の改行方法

`/terminal-setup`が使えない環境では、以下の代替方法もあります：

- `\` + `Enter`：すべてのターミナルで動作
- `Option + Enter`：macOSの場合

## まとめ

Claude Codeで改行に困ったら`/terminal-setup`を実行！これだけで快適な開発環境が手に入ります。

参考：[Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code/interactive-mode)