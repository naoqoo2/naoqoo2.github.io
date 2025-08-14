# 週報自動生成システム その1

## 概要
毎週土曜日に自動的にSlack情報を取得し、前週（月〜金）の振り返り記事下書きを生成するシステムです。

## ファイル構成
```
weekly-retrospective/
├── README.md                    # このファイル
├── weekly-retrospective.sh      # メインスクリプト
├── retrospective-prompt.md      # Claude Code用プロンプト
└── weekly-retrospective.log     # 実行ログ（実行時に生成）
```

## 前提条件
- Claude Codeがインストール済み（`claude`コマンドが使用可能）
- MCP Slack連携が設定済み
- MCPにSlackチャンネルへのアクセス権限付与済み

## 使用方法

### 手動実行（テスト）
```bash
cd /Users/n.niikura/Documents/app/naoqoo2.github.io
./scripts/weekly-retrospective/weekly-retrospective.sh
```

### cron設定（自動実行）

#### 1. crontabの編集
```bash
crontab -e
```

#### 2. 以下の行を追加
```bash
# 週報自動生成 - 毎週土曜日 20:00に実行
0 20 * * 6 /Users/n.niikura/Documents/app/naoqoo2.github.io/scripts/weekly-retrospective/weekly-retrospective.sh

# より詳細なログ出力が必要な場合
0 20 * * 6 /Users/n.niikura/Documents/app/naoqoo2.github.io/scripts/weekly-retrospective/weekly-retrospective.sh >> /Users/n.niikura/Documents/app/naoqoo2.github.io/scripts/weekly-retrospective/cron.log 2>&1
```

#### 3. crontabの確認
```bash
crontab -l
```

## スケジュール設定例
- `0 20 * * 6`: 毎週土曜日の20:00（午後8時）
- `0 9 * * 6`: 毎週土曜日 9:00
- `30 21 * * 6`: 毎週土曜日 21:30
- `0 8 * * 0`: 毎週日曜日 8:00

## 生成されるファイル
- **記事ファイル**: `_posts/retrospective/YYYY-MM-DD-YYYYMMDD.md`
- **ログファイル**: `scripts/weekly-retrospective/weekly-retrospective.log`

## 運用フロー
1. **土曜日 20:00**: 自動で記事ファイル生成
2. **日曜日〜月曜日**: 手動で内容確認・修正
3. **月曜日**: 必要に応じて記事を修正・公開
4. **自動**: 既存のauto-tweet.ymlが自動ツイート実行

## カスタマイズ

### 対象チャンネルの変更
`retrospective-prompt.md`の「対象チャンネル」セクションを編集

### プロンプト内容の調整
`retrospective-prompt.md`内の記事要件や構造を編集

### 実行時間の変更
crontabのスケジュール部分を編集

## トラブルシューティング

### よくある問題

#### 1. Claude Codeが見つからない
```bash
# Claude Codeのパスを確認
which claude

# フルパスを指定する場合
/opt/homebrew/bin/claude < prompt.md
```

#### 2. 権限エラー
```bash
chmod +x /Users/n.niikura/Documents/app/naoqoo2.github.io/scripts/weekly-retrospective/weekly-retrospective.sh
```

#### 3. 環境変数が読み込まれない
cronは最小限の環境変数のみ読み込むため、必要に応じてスクリプト内でPATHを設定

#### 4. MCP接続エラー
- Claude CodeのMCP設定を確認
- Slackトークンの有効性を確認

### ログ確認
```bash
# 実行ログを確認
tail -f /Users/n.niikura/Documents/app/naoqoo2.github.io/scripts/weekly-retrospective/weekly-retrospective.log

# cronログを確認（設定した場合）
tail -f /Users/n.niikura/Documents/app/naoqoo2.github.io/scripts/weekly-retrospective/cron.log
```

### macOS通知
成功時にmacOSの通知が表示されます。表示されない場合はターミナルの通知許可を確認してください。

## 停止方法
cron実行を停止したい場合：
```bash
crontab -e
# 該当行をコメントアウト（行頭に#を追加）または削除
```

# 週報自動生成システム その2

もっとプロンプトシンプルにした版。上記はmdとshでフォーマットの記述重複してて微妙。とはいえsh側消すとアウトプットがいまいちになる。

generate-weekly-report.sh