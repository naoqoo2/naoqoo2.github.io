---
title: "JavaScriptで現在日から前後x日を取得する"
categories:
  - blog
tags:
  - JavaScript
  - date

---

# はじめに  
jsで日付を処理するときってちょくちょくありますよね。  
その度にどうやるんだっけ？ってなってました。  
年月日までだったり時刻も欲しかったりとフォーマットもいろいろでめんどくさい。  
そこで。。  
  
# 関数を作りました  
今後はこれに統一しようと思います。  
使い方はこんな感じ。  
  
**現在日時を取得**  

```js
getDateTime('Y/m/d H:i:s'); // 2015/10/09 12:24:22
```  
**3日前の日付を取得**  

```js
getDateTime('Y年n月j日（w_jp）', -3); // 2015年10月6日（火）
```

## 説明  
```js
string getDateTime ( [ string $format = '' ] [, int $add_day = 0 ] )
```  
指定された引数 add_day を、与えられた フォーマット文字列によりフォーマットし、日付文字列を返します。  
formatが与えられない場合は連想配列を返します。  
add_dayが与えられない場合は、現在日時が使われます。  
  
## パラメータ  
  
### format  
出力される日付文字列の書式。  
※[PHPのdate()](http://php.net/manual/ja/function.date.php)とあわせています。  
  
| format文字 | 説明                                     | 戻り値の例            |  
|------------|------------------------------------------|-----------------------|  
| Y          | 年。4 桁の数字。                         | 例: 1999または2003    |  
| m          | 月。数字。先頭にゼロをつける。           | 01 から 12            |  
| n          | 月。数字。先頭にゼロをつけない。         | 1 から 12             |  
| d          | 日。二桁の数字（先頭にゼロがつく場合も） | 01 から 31            |  
| j          | 日。先頭にゼロをつけない。               | 1 から 31             |  
| H          | 時。数字。24 時間単位。                  | 00 から 23            |  
| G          | 時。24時間単位。先頭にゼロを付けない。   | 0 から 23             |  
| i          | 分。先頭にゼロをつける。                 | 00 から 59            |  
| s          | 秒。先頭にゼロをつける。                 | 00 から 59            |  
| w          | 曜日。数値。                             | 0 (日曜)から 6 (土曜) |  
| w_jp       | 曜日。日本語。                           | 日から土              |  
|            |                                          |                       |  
  
### add_day  
前後x日を指定。0は現在日。  
2で2日後。  
-3で3日前。  
  
# ソースコード  
コピペして使えます。  
  
**getDateTime**  

```js
getDateTime = function(format, add_day){
    if (format == null) format = null;
    if (add_day == null) add_day = 0;

    var obj = {};
    var dt = new Date();
    dt.setTime(dt.getTime() + add_day * 60*1000*60*24);
    var week_jp = ['日','月','火','水','木','金','土'];
    obj.Y = dt.getFullYear();
    obj.m = ('0'+(dt.getMonth() + 1)).slice(-2);
    obj.n = dt.getMonth() + 1;
    obj.d = ('0'+dt.getDate()).slice(-2);
    obj.j = dt.getDate();
    obj.H = ('0'+dt.getHours()).slice(-2);
    obj.G = dt.getHours();
    obj.i = ('0'+dt.getMinutes()).slice(-2);
    obj.s = ('0'+dt.getSeconds()).slice(-2);
    obj.w = dt.getDay();
    obj.w_jp = week_jp[dt.getDay()];
    if(format != null){
        var str = format;
        str = str.replace('w_jp', obj.w_jp);
        str = str.replace('Y', obj.Y);
        str = str.replace('m', obj.m);
        str = str.replace('n', obj.n);
        str = str.replace('d', obj.d);
        str = str.replace('j', obj.j);
        str = str.replace('H', obj.H);
        str = str.replace('G', obj.G);
        str = str.replace('i', obj.i);
        str = str.replace('s', obj.s);
        str = str.replace('w', obj.w);
        return str;
    }else{
        return obj;
    }
};
```

ステキです。  
