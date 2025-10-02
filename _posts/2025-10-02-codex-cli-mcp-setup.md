---
title: "Codex CLIにMCPを追加する方法"
categories:
  - blog
tags:
  - Codex
  - MCP
  - CLI
  - Node.js
  - nvm
---

Codex CLIに MCPを追加する方法をまとめました。すぐ忘れてしまうのでね。

今回は Chrome DevTools MCP を例に、実際の手順を詳しく解説します。

## 前提知識

### Codex CLI とは
OpenAI が提供する公式 CLI ツールで、ChatGPT を コマンドライン から利用できます。MCP サーバーを追加することで、Slack や GitHub、Web スクレイピングなど様々な機能を拡張できます。

### 設定ファイルの特徴
Codex CLI の重要な特徴として、**設定ファイルはグローバルに1つのみ**です：

- **設定場所**: `~/.codex/config.toml`
- **プロジェクト毎の設定は不可**（Claude Code と異なる点）
- **全てのプロジェクトで共通の MCP 設定**

## 実装手順

### 1. Codex CLI のバージョン確認とアップデート

まず現在のバージョンを確認：

```bash
codex --version
```

古い場合は最新版にアップデート：

```bash
# npm でインストールしている場合
npm install -g @openai/codex@latest

# Homebrew でインストールしている場合
brew upgrade codex
```

**2025年10月現在の最新版**: 0.42.0（0.25.0 などは古いのでアップデート推奨）

### 備忘録： nvm 使用時にcodexのバージョンが上がらない？

#### Node.js バージョンの要件

Chrome DevTools MCP は **Node.js 22 以上** が必要です：

```bash
# 現在のバージョン確認
node -v

# Node 22 のインストール（nvm 使用時）
nvm install 22 --latest-npm
nvm use 22
```

自分はNodeバージョンがv20.19.0だったため、切り替える必要がありました。

#### nvm での Codex 管理の注意点

nvm を使用している場合、Node.js バージョンごとに npm グローバルパッケージが分離されます：

```bash
# 現在の Codex の場所確認
which codex
# 例: /Users/username/.nvm/versions/node/v20.19.0/bin/codex

# Node バージョン切り替え時は再インストールが必要
nvm use 22
npm install -g @openai/codex@latest
```

しかし、 `which codex` は `~/.nvm/versions/node/v20.19.0/bin/codex` のため Node 20.19.0 の “npm -g” に入ってる Codex を更新しないと、PATH 上の実体は古いままです。

#### 最短の直し方

```
# 1) いま PATH 上で使われている Node に切替
nvm use 20.19.0

# 2) いったん消す（衝突回避のため）
npm uninstall -g @openai/codex

# 3) シェルのコマンドキャッシュをクリア
hash -r   # bash
rehash    # zsh（bashなら無視されるだけ）

# 4) 最新インストール
npm install -g @openai/codex@latest

# 5) 確認
which codex
codex --version

# 備考：新しいターミナルや VS Code ターミナルを開くと 既定（v20） に戻るため、 22 を“デフォルト”に固定しておくといいでしょう。
nvm alias default 22
```


### 2. Chrome DevTools MCP の追加

今回は **コマンドで追加** する方法を使用：

```bash
codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
```

このコマンドにより、`~/.codex/config.toml` に以下の設定が自動追加されます：

```toml
[mcp_servers."chrome-devtools"]
command = "npx"
args = ["chrome-devtools-mcp@latest"]
```

### 3. 手動設定（参考）

コマンドが使えない場合は、直接ファイル編集でも追加可能：

```bash
# 設定ディレクトリ作成
mkdir -p ~/.codex

# 設定ファイルに追記
cat >> ~/.codex/config.toml <<'TOML'

[mcp_servers."chrome-devtools"]
command = "npx"
args = ["chrome-devtools-mcp@latest"]
TOML
```

## MCP の確認方法

### 現在利用可能な MCP 一覧

Codex を起動して以下のコマンドで確認：

```bash
codex
# セッション内で
/mcp
```

### 設定ファイルの直接確認

設定済みの MCP サーバー名を一覧表示：

```bash
sed -n 's/^\[mcp_servers\.\(.*\)\]/\1/p' ~/.codex/config.toml
```

### 動作確認（使用例）

Chrome DevTools MCP を追加後、以下のような指示で利用可能：

```bash
codex
# セッション内で
MCPの Chrome DevTools を使用して https://www.google.com/ の 画面キャプチャを取得して。
```

## まとめ

Codex CLI への MCP 追加は以下のポイントを押さえれば簡単：

1. **グローバル設定**：`~/.codex/config.toml` に集約
2. **コマンド追加**：`codex mcp add` で簡単導入
3. **バージョン管理**：最新版の使用を推奨
4. **Node.js 要件**：MCP によっては特定バージョンが必要

MCP の追加により、Codex CLI がより強力なツールとして活用できるようになります！
