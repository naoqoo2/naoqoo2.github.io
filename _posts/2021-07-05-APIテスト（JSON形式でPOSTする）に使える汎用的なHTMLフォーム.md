---
title: "APIテスト（JSON形式でPOSTする）に使える汎用的なHTMLフォーム"
categories:
  - blog
tags:
  - HTML
  - API
  - テスト

---

API開発時にPOSTでメソッド渡さなければいけなくてその度にHTML書いて送信して〜ってのをやってたのですが、  
いい加減毎回作るの面倒なので汎用的なのを作りました！  
  
## 画面こんな感じ  
![image.png](/assets/images/20210705/7650e0e6-cc13-bb2a-0750-303144c62f76.png)  
  
## ポイント！   
- APIのURLが書き換えられる  
- Methodも切り替えできる  
- パラメータ名と値が書き換えられる  
- パラメータが足りなければ `add` で追加できる  
- パラメータは `[]` で配列にも対応  
  
## ソース  
  
**api_test.htmlなど適当なファイル名で保存して使ってください。**  

```html
<html>
<head>
</head>
<body>
    <h1>JSONでデータを送信する</h1>
    <p>Url: <input type="text" id="url" name="url" size="100" value="https://example.com/api/hoge"></p>
    <p>Method: <input type="text" id="method" name="method" size="10" value="post"></p>
    <p>Parameter:</p>
    <div id="input-param">
        <p>
            <input type="text" class="param-key" size="10" value="name">
            <input type="text" class="param-value" size="30" value="hoge fuga">
        </p>
        <p>
            <input type="text" class="param-key" size="10" value="email">
            <input type="text" class="param-value" size="30" value="hoge@example.com">
        </p>
        <p>
            <input type="text" class="param-key" size="10" value="prefecture[]">
            <input type="text" class="param-value" size="30" value="東京都">
        </p>
        <p>
            <input type="text" class="param-key" size="10" value="prefecture[]">
            <input type="text" class="param-value" size="30" value="神奈川県">
        </p>
        <template id="input-template">
            <p>
                <input type="text" class="param-key" size="10" value="">
                <input type="text" class="param-value" size="30" value="">
            </p>
        </template>
    </div>
    <p><button id="add" type="button">add</button></p>

    <p><button id="submit" type="button">submit</button></p>
    <textarea id="response" cols=120 rows=10 disabled>Response Values</textarea>
</body>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
<script type="text/javascript">
    $(function () {

        $("#add").click(function () {
            let clone = document.importNode(document.querySelector('#input-template').content, true);
            document.querySelector('#input-param').appendChild(clone);
        });

        $("#submit").click(function () {
            $("#response").html("");
            let url = $("#url").val();
            let type = $("#method").val();

            let param = {};
            if (type.match(/get/i)) {
                $(".param-key").each(function (i, o) {
                    param[$(o).val()] = $(".param-value").eq(i).val();
                });
            } else {
                $(".param-key").each(function (i, o) {
                    // 配列をよしなに対応
                    if ($(o).val().indexOf('[]') != -1) {
                        let key = $(o).val().replace('[]', '');
                        if (param[key] == undefined) {
                            param[key] = [];
                        }
                        param[key].push($(".param-value").eq(i).val());
                    } else {
                        param[$(o).val()] = $(".param-value").eq(i).val();
                    }
                });
                param = JSON.stringify(param);
            }

            // console.log(param);
            // return;

            $.ajax({
                type: type,
                url: url,
                data: param,
                contentType: 'application/json',
                dataType: 'json',
                scriptCharset: 'utf-8',
                success: function (data) {
                    console.log("success");
                    console.log(data);
                    $("#response").html(JSON.stringify(data));
                },
                error: function (data) {
                    console.log("error");
                    console.log(data);
                    $("#response").html(JSON.stringify(data));
                }
            });
        });
    });
</script>
</html>
```

## 参考  
  
https://qiita.com/kidatti/items/21cc5c5154dbbb1aa27f  
