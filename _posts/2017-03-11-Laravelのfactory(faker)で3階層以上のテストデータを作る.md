---
title: "Laravelのfactory(faker)で3階層以上のテストデータを作る"
categories:
  - blog
tags:
  - Laravel
  - laravel5

---

Laravelのファクトリ便利ですよね。  
fakerでテストデータ作るのもラクチンです。  
  
ただ、`User->Post->Comment`のような３階層構造のリレーションモデルを作るときに悩みました。  
  
## 結論  
  
いろいろと試行錯誤した結果、今後はこのコードで作成しようと思います。  
  
**seederまたはtestcode**  

```php
factory(User::class, 3)->create()->each(function ($user) {
    factory(Post::class, 2)->create(['user_id' => $user->id])->each(function ($post){
        factory(Comment::class, 3)->create(['post_id' => $post->id]);
    });
});
```

下記リレーション構造を持つUserが3つ出来上がります。  
  
> - User  
>     - Post  
>         - Comment  
>         - Comment  
>         - Comment  
>     - Post  
>         - Comment  
>         - Comment  
>         - Comment  
  
### メリット  
  
- 書き方が統一されている  
- 何階層でもOK  
- 数値部分を変えれば各件数も思いのまま  
  
### デメリット  
  
- 親IDのカラム名漏れ（でも変更しないだろうし、テストコードだし、いいよね？）  
  
## 経緯  
  
いつもお世話になっている[ReaDoubleのサンプルコード](https://readouble.com/laravel/5.4/ja/database-testing.html#relationships)を参考にしたのですが、いろいろ問題がありました。  
  
### サンプルコードでは2階層までは作れたが  
  
**ReaDoubleのsample**  

```php
$users = factory(App\User::class, 3)->create()->each(function ($u) {
    $u->posts()->save(factory(App\Post::class)->make());
});
```

- 親はcreate、子はmakeでわかりずらい  
- Postを複数作りたいときはsaveManyにしないといけない  
`$user->posts()->saveMany(factory(Post::class, 2)->make());`  
  
### 3階層以上はどうすればいいのかわからなかった  
  
**試行錯誤したがエラーとなるコード**  

```php
factory(User::class, 2)->create()->each(function ($user) {
    $user->posts()->saveMany(factory(Post::class, 2)->make()->each(function ($post) {
        $post->comments()->saveMany(factory(Comment::class, 2)->make());
    }));
});
```

- 親IDがNULL的なエラーが発生する・・・。  
`SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'post_id' cannot be null`  
  
### ファクトリ定義の中で作成する方法もあったけど、、  
  
**ReaDoubleのsample**  

```php
$factory->define(App\Post::class, function ($faker) {
    return [
        'title' => $faker->title,
        'content' => $faker->paragraph,
        'user_id' => function () {
            return factory(App\User::class)->create()->id;
        }
    ];
});
```

- 常に親モデルをcreateすることになってしまう  
- そもそもファクトリ定義はモデル毎に分離しておきたい  
- 3階層以上だと出来てもカオスになりそう  
  
  
### ということで  
  
冒頭のコードにたどり着きました。  
他に良い方法がありましたら教えてください。  
  
それではステキなLaravelライフを。  
