---
title: "LaravelでN+1問題を防ぐ！ relationLoaded と preventLazyLoading のすすめ"
categories:
  - blog
tags:
  - Laravel
  - N+1
  - パフォーマンス
---

# N+1問題、困るよね

N+1問題は「親データを取った後、子データを件数分だけ追加で取得してしまう」ことで、SQLが爆増してパフォーマンスが落ちる現象。  
特にResourceなどのループ処理でリレーションにアクセスすると、気づかないうちに発生しがちです。

# 何が起きるか

- 1件なら問題ない
- 100件になると +100 クエリ
- 気づかずリリースして本番で重い！😱

N+1は、リリース後に発覚すると辛いので「起きない仕組み」を作ることが大事。

# 今まではチェックしてたけど、下記で防げるよ！

これまでは開発中にデバッグしてN+1問題が発生していないかSQLチェックしてました。これが地味に面倒で大変。。

## relationLoaded を使う

Resourceクラス（APIのレスポンス整形層）はループ処理を行うことが多いです。  
ここで不用意にリレーションにアクセスすると、データ数分だけSQLが発行されてしまいます。

`relationLoaded()` を使うことで、

- UseCase側で `with()` してロード済みなら使う
- そうでなければ無視する

という安全な実装になります。  
Resource側は「読み込まれていたら使う」だけにしておけば、N+1の温床になりません。これは便利！

### 例

```php
if ($user->relationLoaded('books')) {
    $books = $user->books;
}
```

UseCase側で必要なデータだけを効率よく `with()` しているので、Resource側は安全にそれを参照するだけの構成にできます。

# 設定しよう！　Model::preventLazyLoading

でも毎回 relationLoaded を書くのも手間ですよね。  
Laravelデフォルトでそうしておいてほしいですね。そんな機能はないの？

あります！  
Laravel 8以降は `Model::preventLazyLoading()` で「うっかりN+1」を防げます！

これを有効にすると、`with()` していないリレーションにアクセスした瞬間に例外を投げてくれます。  
開発中にN+1を完全に防げるので、超強力。

```php
// AppServiceProvider など
use Illuminate\Database\Eloquent\Model;

public function boot()
{
    Model::preventLazyLoading();
}
```

開発中と書きましたが、もちろん本番も同じ設定しててOKです。  
ローカルや開発環境でしっかりテストしていれば、そこで検知できるので、本番で発生したらバグですね！

# まとめ

- すでに運用中のシステムなら
  - **relationLoaded で安全に対策していく**
- 新規構築システムなら
  - **preventLazyLoading を導入して事故を防ぐ**

この2つを使いこなせば、N+1問題とおさらばですね！  
寒い冬はしっかり手洗いうがいをして、インフルエンザとN+1問題を防ぎましょう！
