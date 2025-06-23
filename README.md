# Minimal Mistakes remote theme starter

Click [**Use this template**](https://github.com/mmistakes/mm-github-pages-starter/generate) button above for the quickest method of getting started with the [Minimal Mistakes Jekyll theme](https://github.com/mmistakes/minimal-mistakes).

Contains basic configuration to get you a site with:

- Sample posts.
- Sample top navigation.
- Sample author sidebar with social links.
- Sample footer links.
- Paginated home page.
- Archive pages for posts grouped by year, category, and tag.
- Sample about page.
- Sample 404 page.
- Site wide search.

Replace sample content with your own and [configure as necessary](https://mmistakes.github.io/minimal-mistakes/docs/configuration/).

This repository also hosts a soccer tactics board PWA under [`app/soccer-board`](app/soccer-board/). It lets you position players and a ball on a soccer field, edit player names and numbers, and share board states via encrypted URLs. The board works offline thanks to a service worker.

---

## ローカル環境での実行方法

このサイトをローカル環境で実行するには、以下の手順に従ってください：

### 前提条件

- Ruby 3.0.0以上
- Bundler

### セットアップ手順

1. rbenvを使用してRubyをインストール：

```bash
# Homebrewを使用してrbenvをインストール
brew install rbenv ruby-build

# シェルに rbenv を設定
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
source ~/.zshrc

# Rubyをインストール
rbenv install 3.2.2
rbenv local 3.2.2
```

2. 依存関係をインストール：

```bash
gem install bundler
bundle install
```

3. ローカルサーバーを起動：

```bash
bundle exec jekyll serve
```

4. ブラウザで http://127.0.0.1:4000 にアクセス

### その他のオプション

- ファイル変更を監視して自動的に再構築する場合：

```bash
bundle exec jekyll serve --livereload
```

## Troubleshooting

If you have a question about using Jekyll, start a discussion on the [Jekyll Forum](https://talk.jekyllrb.com/) or [StackOverflow](https://stackoverflow.com/questions/tagged/jekyll). Other resources:

- [Ruby 101](https://jekyllrb.com/docs/ruby-101/)
- [Setting up a Jekyll site with GitHub Pages](https://jekyllrb.com/docs/github-pages/)
- [Configuring GitHub Metadata](https://github.com/jekyll/github-metadata/blob/master/docs/configuration.md#configuration) to work properly when developing locally and avoid `No GitHub API authentication could be found. Some fields may be missing or have incorrect data.` warnings.
