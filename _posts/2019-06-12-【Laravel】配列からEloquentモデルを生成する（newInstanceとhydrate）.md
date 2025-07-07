---
title: "【Laravel】配列からEloquentモデルを生成する（newInstanceとhydrate）"
categories:
  - blog
tags:
  - Laravel

---

## やりたいこと  
  
DBに保存せずに配列をEloquentモデルにしたい。  
  
例）Itemモデルにしたい  
  
## 単一のとき  
  
```
$item = [
    "name" => "商品A",
    "price" => "100",
];
```

### 普通にnewする  
  
```
new Item($item);
```

ただしテスト書きづらくなるのでオススメしない。  
  
  
### newInstanceを使う  
  
```
Item::make()->newInstance($item);
```

※makeでいいのかわかってない。。makeはItemがインスタンス化されている場合は不要。  
  
## 複数のとき  
  
```
$items = [];
$item = [
    "name" => "商品A",
    "price" => "100",
];
$items[] = $item;
$item = [
    "name" => "商品B",
    "price" => "200",
];
$items[] = $item;
```

### hydrateを使う  
  
```
Item::hydrate($items);
```

返り値はCollectionになる。  
