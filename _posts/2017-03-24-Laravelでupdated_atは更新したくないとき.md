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
