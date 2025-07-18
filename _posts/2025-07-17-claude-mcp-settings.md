---
title: "Claude CodeのMCP設定方法"
categories:
  - blog
tags:
  - Claude
  - MCP
  - 設定
  - AI
---

Claude Code（claude.ai/code）でMCP使おうとして、設定どうすればいいんだっけ？と毎回迷うのでメモしておきます。

## MCPとは？

MCP（Model Context Protocol）は、Claudeが外部のツールやサービスと連携するためのプロトコルです。  
これを使うとClaudeで天気情報の取得とか、Webブラウザの自動化、Notion API連携、Slack連携とかができるようになります。

## Claude CodeでMCPを使う方法

すでにClaude Desktopで MCP を使っている場合は超簡単！

### 1. Claude Desktopで設定済みのMCPサーバーを確認

まず、Claude Desktopで設定済みのMCPサーバーを確認：

```bash
cat "/Users/$(whoami)/Library/Application Support/Claude/claude_desktop_config.json"
```

### 2. 一発コマンドでプロジェクトに追加

Claude Codeのプロジェクトで以下のコマンドを実行するだけ：

```bash
claude mcp add-from-claude-desktop
```

これだけで、Claude Desktopで設定済みの全てのMCPサーバーがプロジェクトで使えるようになります！

## まとめ

Claude CodeでMCPを使うのは、`claude mcp add-from-claude-desktop` 一発で完了！

Claude Desktopで一度設定してしまえば、あとはプロジェクトごとにこのコマンドを実行するだけで、全てのMCPツールが使えるようになります。

次回は実際にこれらのMCPツールを使った具体的な活用事例を紹介してみたいと思います。

それでは！