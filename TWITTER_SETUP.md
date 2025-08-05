# Twitter API自動投稿セットアップ手順

## 1. Twitter Developer Account作成

### 1-1. Twitter Developer Portal登録
1. [Twitter Developer Portal](https://developer.twitter.com/) にアクセス
2. 「Sign up」をクリック
3. Twitterアカウントでログイン
4. 電話番号認証を完了

### 1-2. アプリケーション作成
1. 「Create an app」をクリック
2. アプリ情報を入力：
   - **App name**: `naoqoo2-blog-auto-tweet`
   - **Description**: `Automatic tweet for blog posts`
   - **Website URL**: `https://naoqoo2.github.io`
   - **Tell us how this app will be used**: `This app will automatically tweet when new blog posts are published via GitHub Actions.`

### 1-3. API Keys取得
1. 作成したアプリの「Keys and tokens」タブへ
2. 以下をコピーして保存：
   - **API Key** (Consumer Key)
   - **API Key Secret** (Consumer Secret)
   - **Bearer Token**
3. 「Access Token and Secret」セクションで「Generate」をクリック：
   - **Access Token**
   - **Access Token Secret**

## 2. GitHub Repository設定

### 2-1. Secrets設定
1. GitHubリポジトリ → Settings → Secrets and variables → Actions
2. 「New repository secret」で以下を追加：

```
TWITTER_API_KEY: [API Key]
TWITTER_API_SECRET: [API Key Secret]
TWITTER_ACCESS_TOKEN: [Access Token]
TWITTER_ACCESS_TOKEN_SECRET: [Access Token Secret]
TWITTER_BEARER_TOKEN: [Bearer Token]
```

### 2-2. GitHub Actions有効化
1. リポジトリの「Actions」タブで有効化を確認
2. ワークフロー権限を「Read and write permissions」に設定

## 3. テスト手順

### 3-1. 手動実行テスト
1. GitHub Actions画面で「Auto Tweet」ワークフローを選択
2. 「Run workflow」でテスト実行
3. ツイートが正常に投稿されるか確認

### 3-2. 自動実行テスト
1. 新しい記事をコミット・プッシュ
2. GitHub Actionsが自動実行されるか確認
3. ツイートが自動投稿されるか確認

## 4. トラブルシューティング

### よくあるエラー
- **403 Forbidden**: API権限を確認、アプリ設定で「Read and Write」有効化
- **401 Unauthorized**: APIキーが正しく設定されているか確認
- **429 Rate Limit**: 無料プランの月間500投稿制限に注意

### デバッグ方法
1. GitHub Actions画面でログを確認
2. Twitter Developer Portalの「Usage」で制限状況確認
3. APIキーの再生成を試行

## 5. 自動ツイート内容

### カテゴリ別テンプレート

#### 料理記事 (cooking/)
```
🍳 新しい料理レシピをブログに投稿しました！
{記事タイトル}
{記事URL}
#料理 #レシピ #ブログ
```

#### 振り返り記事 (retrospective/)
```
📝 今週の振り返りをブログに投稿しました！
{記事タイトル}
{記事URL}
#振り返り #FiSH哲学 #ブログ
```

#### 技術記事 (その他)
```
📖 新しい記事をブログに投稿しました！
{記事タイトル}
{記事URL}
#ブログ #技術
```

## 6. 運用上の注意点

- **投稿制限**: 無料プランは月間500投稿まで
- **重複投稿**: 同じ内容の連続投稿は避ける
- **API利用規約**: Twitter Developer Agreement遵守
- **定期的な確認**: 月1回程度で動作状況をチェック