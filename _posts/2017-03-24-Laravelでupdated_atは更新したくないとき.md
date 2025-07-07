---
title: "Laravelでupdated_atは更新したくないとき"
categories:
  - blog
tags:
  - Laravel

---

下記のようにするとupdated_atを更新せずにレコード上書きできます。  
  
```php
$item->status = 'xxx';
// 更新日時は更新しない
$item->timestamps = false;
$item->save();
```

パッチを当てたい場合など、なんらかの理由で更新日時を変更したくないときにどうぞ。  


update()メソッドで複数レコード更新したい場合は下記！
残念ながらオプション的なものはないので、レコードの値をそのまま使ってあげます。

```php
$items()->update(['status' => 'xxx', 'updated_at' => DB::raw('updated_at')]);
```
