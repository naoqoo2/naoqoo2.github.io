#!/bin/bash

# 週報自動生成スクリプト
# 毎週土曜日にcronで実行され、前週の振り返り記事下書きを生成

set -e  # エラー時に終了

# スクリプトが存在するディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# ログファイルの設定
LOG_FILE="$SCRIPT_DIR/weekly-retrospective.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$DATE] 週報生成スクリプト開始" >> "$LOG_FILE"

# 前週の月曜日と金曜日を計算
get_last_week_dates() {
    if command -v gdate >/dev/null 2>&1; then
        # GNU date (macOS with coreutils installed)
        local last_monday=$(gdate -d 'last monday -1 week' '+%Y-%m-%d')
        local last_friday=$(gdate -d "$last_monday +4 days" '+%Y-%m-%d')
    else
        # BSD date (macOS default)
        local days_since_monday=$(date +%u)
        local days_to_subtract=$((days_since_monday + 6))
        local last_monday=$(date -v-${days_to_subtract}d '+%Y-%m-%d')
        local last_friday=$(date -j -f '%Y-%m-%d' "$last_monday" -v+4d '+%Y-%m-%d')
    fi
    
    echo "$last_monday $last_friday"
}

# 日付を取得
dates=($(get_last_week_dates))
LAST_MONDAY="${dates[0]}"
LAST_FRIDAY="${dates[1]}"

echo "[$DATE] 対象期間: $LAST_MONDAY ～ $LAST_FRIDAY" >> "$LOG_FILE"
echo "[$DATE] ファイル日付: $NEXT_MONDAY" >> "$LOG_FILE"

# ファイル名生成（次の月曜日の日付を使用）
MONDAY_FORMATTED=$(echo "$LAST_MONDAY" | sed 's/-//g')
START_DATE_FORMATTED=$(echo "$LAST_MONDAY" | sed 's/-/\//g')

# 次の月曜日の日付を計算
get_next_monday() {
    if command -v gdate >/dev/null 2>&1; then
        # GNU date (macOS with coreutils installed)
        gdate -d 'next monday' '+%Y-%m-%d'
    else
        # BSD date (macOS default)
        local days_until_monday=$(((8 - $(date +%u)) % 7))
        if [ $days_until_monday -eq 0 ]; then
            days_until_monday=7
        fi
        date -v+${days_until_monday}d '+%Y-%m-%d'
    fi
}

NEXT_MONDAY=$(get_next_monday)
FILENAME="${NEXT_MONDAY}-${MONDAY_FORMATTED}.md"
OUTPUT_PATH="$PROJECT_DIR/_posts/retrospective/$FILENAME"

# 既にファイルが存在する場合はスキップ
if [ -f "$OUTPUT_PATH" ]; then
    echo "[$DATE] ファイルが既に存在します: $FILENAME" >> "$LOG_FILE"
    exit 0
fi

# Claude Codeのプロンプトファイルが存在するかチェック
PROMPT_FILE="$SCRIPT_DIR/retrospective-prompt.md"
if [ ! -f "$PROMPT_FILE" ]; then
    echo "[$DATE] エラー: プロンプトファイルが見つかりません: $PROMPT_FILE" >> "$LOG_FILE"
    exit 1
fi

# Claude Codeが利用可能かチェック
if ! command -v claude &> /dev/null; then
    echo "[$DATE] エラー: Claude Codeがインストールされていません" >> "$LOG_FILE"
    exit 1
fi

# プロンプトに日付を埋め込み
TEMP_PROMPT=$(mktemp)
sed "s/{{LAST_MONDAY}}/$LAST_MONDAY/g; s/{{LAST_FRIDAY}}/$LAST_FRIDAY/g; s/{{MONDAY_FORMATTED}}/$MONDAY_FORMATTED/g; s|{{START_DATE_FORMATTED}}|$START_DATE_FORMATTED|g" "$PROMPT_FILE" > "$TEMP_PROMPT"

echo "[$DATE] Claude Codeを起動します..." >> "$LOG_FILE"

# Claude Codeを実行して記事を生成
cd "$PROJECT_DIR"
echo "週報記事を生成中..." >> "$LOG_FILE"

# 一時的なシェルスクリプトを作成してClaude Codeを実行
CLAUDE_SCRIPT=$(mktemp)
cat > "$CLAUDE_SCRIPT" << EOF
#!/bin/bash
# Claude Codeでの記事生成スクリプト

# プロンプトをClaude Codeに送信し、記事を生成
claude << 'PROMPT_END'
$(cat "$TEMP_PROMPT")

上記のプロンプトに従って、Markdown形式の記事を生成してください。
記事のみを出力し、説明や追加のコメントは含めないでください。
記事は以下の形式で開始してください：

---
title: "先週のふりかえり $START_DATE_FORMATTED"
categories:
  - retrospective
tags:
  - ふりかえり
---

PROMPT_END
EOF

chmod +x "$CLAUDE_SCRIPT"

# Claude Codeを実行して記事を生成
"$CLAUDE_SCRIPT" > "$OUTPUT_PATH.tmp" 2>>"$LOG_FILE"

# 生成されたファイルから記事部分のみを抽出（Claude Codeの出力から記事部分を取得）
if [ -s "$OUTPUT_PATH.tmp" ]; then
    # 記事の開始（YAML front matter）を探して、それ以降を記事として保存
    if grep -q "^---$" "$OUTPUT_PATH.tmp"; then
        # YAML front matterが見つかった場合、記事として保存
        mv "$OUTPUT_PATH.tmp" "$OUTPUT_PATH"
    else
        # YAML front matterが見つからない場合、テンプレートを使用
        cat > "$OUTPUT_PATH" << TEMPLATE_EOF
---
title: "先週のふりかえり $START_DATE_FORMATTED"
categories:
  - retrospective
tags:
  - ふりかえり
---

[2025年の抱負は「FiSH!🐟」]({% post_url 2025-01-06-houfu2025 %})ということで、FiSH!哲学で1週間を振り返ります！

※この記事は、AIがSlackを分析・生成した内容を元に加筆修正しています。

## 🎭 態度を変える

- この週の具体的なエピソードを記入してください

## 🎲 遊ぶ

- この週の具体的なエピソードを記入してください

## 😊 人を喜ばせる

- この週の具体的なエピソードを記入してください

## 👀 注意を向ける

- この週の具体的なエピソードを記入してください

その週の特徴を表現するまとめ文！💪
TEMPLATE_EOF
        rm -f "$OUTPUT_PATH.tmp"
    fi
fi

# 一時ファイルをクリーンアップ
rm -f "$CLAUDE_SCRIPT"

# 生成結果をチェック
if [ -s "$OUTPUT_PATH" ]; then
    # ファイルサイズが0でない場合、成功とみなす
    echo "[$DATE] 週報下書きテンプレートを生成しました: $FILENAME" >> "$LOG_FILE"
    
    # 成功を通知（オプション）
    if command -v osascript &> /dev/null; then
        osascript -e "display notification \"週報下書きテンプレートが生成されました: $FILENAME\" with title \"週報自動生成\""
    fi
else
    echo "[$DATE] エラー: 週報テンプレートの生成に失敗しました" >> "$LOG_FILE"
    exit 1
fi

# 一時ファイルをクリーンアップ
rm -f "$TEMP_PROMPT"

echo "[$DATE] 週報生成スクリプト終了" >> "$LOG_FILE"