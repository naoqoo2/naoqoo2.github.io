---
title: "Qiitaからのブログ移行。Qiita記事を引越用に書き換えるスクリプトを作りました！"
categories:
  - blog
tags:
  - ブログ移行
  - Qiita
  - python
---

## 背景  

Qiitaにたくさん記事を書いてきたものの、個人ブログへ完全移行したい。  
とはいえ Qiita からの導線・検索流入は残したいので  

- Qiita … 概要＋ブログへのリンク  
- ブログ … 本編＋追記  

という役割分担に切り替えることにしました。  
記事数が 70 本以上あったので手作業では無理。  
「要点箇条書きを自動生成 → Qiita API で一括更新」できる CLI を作りました。  

## 全体フロー  

1. `_posts/*.md` を読み込み、FrontMatter からタイトル／カテゴリを取得  
2. `_site` の静的ファイルを逆引きして実際の公開 URL を確定  
3. 本文の Markdown を分解し、見出し単位で要点を最大3件抽出  
4. 生成したテキストをテンプレに差し込み  
5. Qiita API (`PATCH /items/:id`) で本文を書き換え  

処理対象は Qiita API の `GET /authenticated_user/items` で一覧取得して紐付けます。  
タイトル一致でマッピングするので、Qiita とブログでタイトルが同じであることが前提です。  

## 事前準備（Qiitaアクセストークン）  

1. Qiita ログイン → 右上アイコン → 設定 → **アプリケーション**  
2. 「個人用アクセストークンを発行」で `read_qiita` と `write_qiita` を付与  
3. 表示されたトークン文字列を `naoqoo2.github.io/.qiita_token` に保存（1行のみ）  
   ```bash
   echo 'YOUR_TOKEN' > .qiita_token
   chmod 600 .qiita_token
   ```  
4. `.gitignore` に追加してリポジトリには含めない  

## スクリプトの中身  

`_includes/update_qiita_excerpts.py` で完結。ポイントだけ抜粋します。  

```python
posts = load_posts()  # _posts から本文とカテゴリを取得
items = fetch_qiita_items(token)  # Qiita API で自アカ記事を取得
for item in items:
    post = posts[item["title"]]
    blog_url = build_blog_url(post["category_path"], post["slug"])
    body = build_excerpt(post["content"], blog_url, item["title"])
    patch_qiita_item(item, body, token)  # Qiita本文を書き換える
```

- **slug解決**: `_posts` の `slug:` がない場合でも `_site` 配下の `index.html` から `<title>` を逆引きして実際のディレクトリ名を取得。`【】` 含むタイトルでも 404 にならない。  
- **要点生成**: `##` 見出しを基準にセクションを切り出し、冒頭2文を抜粋。余談や締めくくり系の見出しは除外。足りない場合はテンプレ文で3件埋める。  
- **API更新**: `title/tags/private/group` など既存メタをそのまま送っているので、副作用で公開設定が変わる心配はなし。  

## 使い方  

1. Dryラン（Qiitaは更新しない）  
   ```bash
   python3 _includes/update_qiita_excerpts.py --limit 3
   ```  
   コンソールで各記事のテンプレ文を確認できる。`--limit` を外せば全件表示。  

2. 本番更新  
   ```bash
   python3 _includes/update_qiita_excerpts.py --apply
   ```  
   API レートリミット対策で 1 件ごとに `sleep(1)` を入れているので、70 本で約 1.5 分。  

3. 変更確認  
   - Qiita 記事を何件か開き、冒頭に `> この記事は個人ブログに移行しました...` が出ているかチェック  
   - サーチコンソールで naoqoo2.com のインデックス状況をウォッチ  

## カスタマイズメモ  

- 要点テンプレは `GENERIC_POINT_TEMPLATES` を書き換えれば差し替え可能。  
- 表記ゆれが多い記事は `_posts` の `slug:` を手動追加しておくとより確実。  
- Qiita 以外の CMS にも応用できる構造なので、API エンドポイントさえあれば他サービスでも使える。  

## なぜQiita側に要点だけ残すのか  

- **検索面**: Qiitaが完全に空になると一時的に404/410扱いになり、検索流入がゼロになる。要点を残しておけばQiita上の権威と被リンクを生かしつつ、正規のブログへ案内できる。  
- **読者体験**: ブログへ飛ぶ前に要点を掴めるので、ユーザーが移動する価値を判断しやすい。単なるリンクだけのページよりも親切。  
- **Qiitaガイドライン**: 宣伝だけのページにならないよう、Qiita上でも最低限の技術情報を提供しておくのが安心。  
- **自分用メモ**: Qiitaのダッシュボードから全記事の要点をざっと確認できるので、自分自身の振り返りにも役立つ。  

## 所感  

移行済みリンクをまとめて書き換えると、Qiita と個人ブログの棲み分けが一気に明確になりました。  
「ブログ本編を更新 → Qiitaは要点だけ自動生成して更新」という仕組みにしておくと、移行後のメンテも楽です。  
同じ悩みを持つ方は、ぜひこのスクリプトを土台にカスタマイズしてみてください。

## ソースコード全文  

{% capture qiita_script %}
{% include update_qiita_excerpts.py %}
{% endcapture %}
{% highlight python %}
{{ qiita_script | strip }}
{% endhighlight %}
