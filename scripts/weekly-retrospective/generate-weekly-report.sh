#!/bin/bash

# 週報生成用シンプルスクリプト
# 使用例: ./generate-weekly-report.sh
# cron使用例: 0 9 * * 2 /path/to/generate-weekly-report.sh

set -euo pipefail

# ログファイル設定
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="${SCRIPT_DIR}/weekly-retrospective.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# ログ関数
log() {
    echo "[$DATE] $1" | tee -a "$LOG_FILE"
}

log "週報生成スクリプト開始"

# Claude Codeが利用可能か確認
if ! command -v claude &> /dev/null; then
    log "エラー: claude コマンドが見つかりません"
    exit 1
fi

# 非対話モードでClaude Codeを実行
log "Claude Codeで週報を生成中..."

# プロンプトをClaude Codeに送信（非対話モード）
echo "MCPを使用して、以下のSlackチャンネルIDから先週1週間（月〜金）の私（UNS208RQ8）の発言データを全て取得して週報ブログを作成してください。
フォーマットは_posts/retrospective/の既存の書き方を参考にしてください。

チャンネルID
- C074F197UR3
- CD1HZ3VJS
- CCZKKDDR7
- C02LH1C4BPD
- CBVHMHMBM
- C08U98ZLGMR
- CCZGGA0PJ" | timeout 300 claude 2>&1 | tee -a "$LOG_FILE"

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    log "週報生成が完了しました"
else
    log "エラー: 週報生成が失敗しました（終了コード: $EXIT_CODE）"
    exit $EXIT_CODE
fi

log "週報生成スクリプト終了"