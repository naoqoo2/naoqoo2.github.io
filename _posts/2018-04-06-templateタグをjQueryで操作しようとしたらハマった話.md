---
title: "templateタグをjQueryで操作しようとしたらハマった話"
categories:
  - blog
tags:
  - HTML
  - jQuery
  - template

---

jQueryを使ってtemplateタグをクローンしようとしたら中々にハマったのでメモ。  
  
## 結論  
  
一度HTML文字列として取得してからjQueryオブジェクトにする  
  
```javascript
var clone = $($('#productrow').html());
```

## これはダメ  
  
templateタグからは直接操作できなかった。。  
  
```javascript
var clone = $('#productrow *');
var clone = $('#productrow').children();
```

## 検証用メモ  
  
HTMLはこちらを使用  
https://naoqoo2.com/20180403-templateタグはクローンしてから使おう.md  
  
```html

<script
  src="https://code.jquery.com/jquery-3.3.1.js"
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>

<script>
if ('content' in document.createElement('template')) {

  var clone = $($('#productrow').html());
  $('td', clone).eq(0).text('0384928528');
  $('td', clone).eq(1).text('Acme Kidney Beans');
  $('tbody').append(clone);

}
</script>
```  
