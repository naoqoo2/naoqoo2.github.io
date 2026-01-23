---
title: "LaravelでN+1問題を防ぐ！relationLoadedとpreventLazyLoadingのすすめ"
categories:
  - blog
tags:
  - Laravel
  - N+1
  - パフォーマンス
---

# N+1困るよね

N+1問題は「親データを取った後、子データを件数分だけ追加で取得してしまう」ことで、SQLが爆増してパフォーマンスが落ちる現象。  
特にResourceなどのループ処理でリレーションにアクセスすると、気づかないうちに発生しがち。

# 何が起きるか

- 1件なら問題ない
- 100件になると +100 クエリ
- 本番で地味に効いてくる

N+1は、発覚すると辛い。なので「起きない仕組み」を作るのが大事。

# 今まではチェックしてたけど、下記で防げるよ！

## relationLoadedで安全に使う

> f ($owner->relationLoaded('assetOwners'))  
> でN+1問題を防げるんですね！

その通り。  
Resourceクラス（APIのレスポンス整形層）はループ処理の中で呼ばれることが多い。  
ここで不用意にリレーションにアクセスすると、データ数分だけSQLが発行されてしまう。

`relationLoaded()` を使うことで、

- UseCase側で `with()` してロード済みなら使う
- そうでなければ無視する

という安全な実装になる。  
Resource側は「読み込まれていたら使う」だけにしておけば、N+1の温床にならない。

### 例

```php
if ($owner->relationLoaded('assetOwners')) {
    $assetOwners = $owner->assetOwners;
}
```

UseCase側で必要なデータだけを効率よく `with()` しているので、Resource側は安全にそれを参照するだけの構成にできる。

# 設定しよう！Model::preventLazyLoading

> そしたらLaravelデフォルトでそうしておいてほしいですね。そんな機能はないの？

ある！  
Laravel 8以降は `Model::preventLazyLoading()` で「うっかりN+1」を防げる。

これを有効にすると、`with()` していないリレーションにアクセスした瞬間に例外を投げてくれる。  
開発中にN+1を完全に防げるので、超強力。

```php
// AppServiceProvider など
use Illuminate\Database\Eloquent\Model;

public function boot()
{
    Model::preventLazyLoading();
}
```

# 本番も設定しててOK

本番だけで発生するケースはほぼない。  
ローカルやステージングでテストしていれば、そこで検知できるから。

つまり、

- **relationLoadedで安全に使う**
- **preventLazyLoadingで事故を止める**

この2つを組み合わせれば、N+1はかなり防げる。  
N+1を防ごう！
