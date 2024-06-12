---
title: "【kintone】カスタマイズビューのHTML文字数上限を超える"
categories:
  - blog
tags:
  - JavaScript
  - kintone

---

  
HTMLは10,000文字以下という制約に引っかかってしまったときの解決法。  
  
HTMLをjsの変数として定義して埋め込みましょう。  
  
## HTMLは空タグのみ用意  
  
埋め込み先として空のdivタグのみ記述します。  
  
**一覧のカスタマイズHTML**  

```html
<div id="customize_view"></div>
```

## 実際に表示したいHTMLをjsファイルに定義  
  
[テンプレートリテラル（バッククォートで囲む）](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/template_strings)を使えば改行のまま定義できて便利。  
  
**customize_view_template.js**  

```javascript
const customize_view_template = `
{ここに10,000文字を超えるHTMLを書く}
`;
```

## jsで表示する  
  
最後に定義したHTMLをjsで出力します。  
  
**customize_view_logic.js**  

```javascript
(function() {
    "use strict";

    const customize_view_id = 'customize_view';

    kintone.events.on(['app.record.index.show'], function (event) {
        // 対象のビューでない場合は処理しない
        if (document.getElementById(customize_view_id) == null) {
            return event;
        }

        // 出力
        document.getElementById(customize_view_id).insertAdjacentHTML('afterbegin', customize_view_template);

    });
})();
```

  
