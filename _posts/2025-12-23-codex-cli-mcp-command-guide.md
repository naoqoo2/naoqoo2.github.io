---
title: "Codex CLIでMCPを使う方法まとめ"
categories:
  - blog
tags:
  - CodexCLI
  - MCP
---

Codex CLI v0.4 以降は、`codex mcp` コマンドで MCP サーバーの追加・削除・一覧確認をすべて完結できます。ここでは、CLI 上でよく使う 4 つのコマンドをストーリー形式でまとめました。Chrome DevTools MCP を例にしていますが、他の MCP でも同じ流れで応用できます。

## 1. まずは全体像を掴む (`codex mcp --help`)

オプション構成が分からないまま手を動かすと迷子になりがちです。`--help` でサブコマンドの説明をざっと眺め、使い方の全体像を掴んでから進みましょう。

```bash
codex mcp --help
```

ここで確認できるポイント

- `add`, `list`, `remove` など MCP 管理に関係する主要コマンド
- 1 コマンドで `command` と `args` を一括登録できるフォーマット
- グローバル設定ファイル `~/.codex/config.toml` が更新対象であること

## 2. Chrome DevTools MCP を追加する (`codex mcp add …`)

インストールや設定ファイルの手編集は不要です。以下の 1 行で `command` と `args` が `config.toml` に追記され、頭から Codex CLI で利用できるようになります。Chrome DevTools MCP の場合は `--headless=false` を付けてデバッガ画面を出しながら使うのが分かりやすいです。

```bash
codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest --headless=false
```

コマンドの読み方

- `chrome-devtools` が MCP サーバー名。`mcp_servers."chrome-devtools"` として保存される
- `--` 以降は OS 上で実行するプロセス (`npx` + 引数)
- `--headless=false` を args に入れるとブラウザ UI を開いた状態で DevTools オートメーションを扱える

実行後は `~/.codex/config.toml` に以下のように追記されます（例）:

```toml
[mcp_servers."chrome-devtools"]
command = "npx"
args = ["chrome-devtools-mcp@latest", "--headless=false"]
```

## 3. 登録済み MCP を確認する (`codex mcp list`)

設定を追加したら正しく反映されているか、その場で確認しておくと安心です。`list` は `config.toml` を読み込み、登録済みの MCP 名と実行コマンドを一覧表示してくれます。

```bash
codex mcp list
```

出力例では各 MCP に割り当てられた `command` / `args` の要約を確認できるので、設定の typo や引数漏れを早期に検出できます。加えて `list --json`（ヘルプ参照）を使えばスクリプトからの検査にも応用可能です。

## 4. 不要になった MCP を片付ける (`codex mcp remove …`)

検証が終わった MCP を放置すると `~/.codex/config.toml` が肥大化し、目的の MCP を探しづらくなります。不要になったタイミングで `remove` を実行し、設定をクリーンに保ちましょう。

```bash
codex mcp remove chrome-devtools
```

`remove` は指定した MCP 名に紐づく `command` と `args` を丸ごと削除します。後から同じ MCP を再利用したくなったら「2. add」からやり直せば OK です。

## まとめとワークフロー例

1. `codex mcp --help` でコマンド体系を把握
2. `codex mcp add …` で必要な MCP を追加
3. `codex mcp list` で設定確認（必要なら `--json` で自動テスト）
4. 使い終わったら `codex mcp remove …` でクリーンアップ

Codex CLI は設定ファイルがグローバル共有な点に気を付けながら、この 4 コマンドをルーティンにすると MCP との付き合いがぐっと楽になります。ぜひターミナルのお供にどうぞ。
