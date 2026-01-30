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

## Artifact Review Policy = Agent Decides

成果物（Artifact）のレビューを求めるか。
Agent Decides はタスクの複雑さやユーザーの好みに基づいて、エージェントが自律的に判断します。
基本的には効率よくAIに作業してもらうため、エージェントの自律性を優先しています。

## Terminal Command Auto Execution = Always Proceed

ターミナルコマンドの実行前にユーザーに確認を求めるか。
Always Proceedにして、拒否リストにあるものを除き許可しています。
こちらは予期せぬコマンドを実行される懸念もありますが、サンドボックスで実行されるようになったので安心かなと。

## Browser Javascript Execution Policy = Always Proceed

ブラウザでのJavaScript実行時に許可を求めない設定です。
JavaScriptは基本ONでないと多くのサイトが操作できないため、Always Proceedにしています。
セキュリティ的な懸念もそこまで高くないと判断しています。

# MCP

## 設定ファイルのパス

`~/.gemini/antigravity/mcp_config.json`

中身こんな感じ。JSONなので最後にカンマあるとエラーになるので編集時注意。

```json
{
  "mcpServers": {
    "slack": {
    },
    "notionApi": {
    }
  }
}
```

## Slack MCP

### 手順

1. [Slack API](https://api.slack.com/apps) でアプリを作成（From scratch）
2. **OAuth & Permissions** で `chat:write`, `channels:history` などの権限を付与
3. **Install to Workspace** を実行し、`Bot User OAuth Token` (`xoxb-...`) を取得
4. ワークスペースのURLなどから `Team ID` (`T...`) を取得

### 設定の記述

```json
"slack": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-slack"],
  "env": {
    "SLACK_BOT_TOKEN": "xoxb-xxxx...",
    "SLACK_TEAM_ID": "Txxxx..."
  }
}
```

## Notion MCP

### 手順

1. [My Integrations](https://www.notion.so/my-integrations) で新しいインテグレーションを作成
2. `Internal Integration Secret` (`ntn_...`) を取得
3. 接続したいページで、右上の「...」メニュー > **Connect** (接続) > 作成したインテグレーションを選択

### 設定の記述

`OPENAPI_MCP_HEADERS` にJSON形式で認証情報を渡します。

```json
"notionApi": {
  "command": "npx",
  "args": ["-y", "@notionhq/notion-mcp-server"],
  "env": {
    "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer ntn_xxxx...\", \"Notion-Version\": \"2022-06-28\" }"
  }
}
```

## Figma MCP

### 手順

FigmaデスクトップアプリをインストールしてデスクトップMCPサーバーとして実行します。そのためトークンは不要。

1. Figmaデスクトップアプリをインストール（最新版）
2. Figma Designファイルを開く
3. **Dev Mode** に切り替える (`Shift + D`)
4. インスペクトパネルの **MCP Server** セクションで「デスクトップMCPサーバーを有効化」をクリック

### 設定の記述

Figmaアプリとローカル通信を行う設定になります。

```json
"figma-dev-mode-mcp-server": {
  "command": "npx",
  "args": [
    "mcp-remote",
    "http://127.0.0.1:3845/sse"
  ],
  "env": {}
}
```

### 備考

Figmaアプリ入れずにリモートMCPサーバーで動作させてみようとしたがイマイチ記法がわからず諦めました。

参考：[Figmaの公式ヘルプ](https://help.figma.com/hc/ja/articles/32132100833559)


## GitHub MCP

### 手順

1. GitHubの [Developer Settings](https://github.com/settings/tokens) へ
2. **Personal access tokens (Classic)** または **Fine-grained tokens** を作成
3. 必要な権限（Repo, Userなど）を付与して生成

### 設定の記述

```json
"github-mcp-server": {
  "command": "docker",
  "args": [
    "run",
    "-i",
    "--rm",
    "-e",
    "GITHUB_PERSONAL_ACCESS_TOKEN",
    "ghcr.io/github/github-mcp-server"
  ],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxx..."
  }
}
```

