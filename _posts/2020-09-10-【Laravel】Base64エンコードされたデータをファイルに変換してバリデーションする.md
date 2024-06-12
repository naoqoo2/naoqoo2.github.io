---
title: "【Laravel】Base64エンコードされたデータをファイルに変換してバリデーションする"
categories:
  - blog
tags:
  - base64
  - Laravel

---

## はじめに  
画像アップロードAPIを実装する際、webだと「multipart/form-data形式」なことが多いですが、アプリは「Base64形式」で処理したいといったことがあります（ありました）  
  
## Base64をバリデーションしたい  
  
Laravelは[バリデーションが豊富](https://readouble.com/laravel/6.x/ja/validation.html#rule-image)なので、Base64もいい感じに処理してくれるかなーと思ったのですが、そんなに甘くはありませんでした。  
  
[ググった](https://www.semicolonworld.com/question/51682/validate-a-base64-decoded-image-in-laravel)ら、Base64用のバリデーション書け的な感じで、そうなるとアップロード処理もbase64用に書く必要がありそうです。  
すでに画像ファイルのアップロード処理は実装済だったので、バリデーション前にBase64を画像ファイルに変換してあげることができればよさそうです。  
  
## Base64をファイルに変換して処理する  
  
「multipart/form-data」で送信したファイルをFormRequestで`dd()`してみると、`UploadedFile`オブジェクトであることがわかりました。  
FormRequestでバリデーション前に何か処理をするには`validationData()`に記述します。ここでBase64を`UploadedFile`に変換してあげます。  
  
せっかくなのでパラメータを2つ用意し、どちらの形式でもアップロードできるようにしました。  
  
- `file`：multipart/form-data形式  
- `file_base64`：Base64形式  
    - `file_name_base64`：Base64形式でアップする際のファイル名  
  
```php

<?php

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;

class UploadImageRequest extends FormRequest
{
    public function validationData()
    {
        $all = parent::validationData();

        if ($this->get('file_base64')) {
            // base64をデコード。プレフィックスに「data:image/jpeg;base64,」のような文字列がついている場合は除去して処理する
            $data = explode(',', $this->get('file_base64'));
            if (isset($data[1])) {
                $fileData = base64_decode($data[1]);
            } else {
                $fileData = base64_decode($data[0]);
            }

            // tmp領域に画像ファイルとして保存してUploadedFileとして扱う
            $tmpFilePath = sys_get_temp_dir() . '/' . Str::uuid()->toString();
            file_put_contents($tmpFilePath, $fileData);
            $tmpFile = new File($tmpFilePath);
            $filename = $tmpFile->getFilename();
            if ($this->get('file_name_base64')) {
                // ファイル名の指定があればセット
                $filename = $this->get('file_name_base64');
            }
            $file = new UploadedFile(
                $tmpFile->getPathname(),
                $filename,
                $tmpFile->getMimeType(),
                0,
                true
            );
            $all['file'] = $file;
        }
        return $all;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'file' => 'required_without:file_base64|image|mimes:jpeg|max:5000|dimensions:max_width=1200,max_height=1200,ratio=1/1', // ファイルのバリデーションよしなに。
            'file_base64' => 'required_without:file|string', // ファイルデータをbase64で文字列としても受け入れる。バリデーションルールはfileが適用される。
            // 'file_name_base64' => 'required_with:file_base64|string|max:150', // 必要に応じて
        ];
    }
}
```

あとは`$request->validated()['file']`を使ってアップロード処理を実装するだけです。  
共通化できて最&高 DJ KOO イージードゥーダーンス！！  
  
## さいごに  
  
テスト用にファイルをbase64に変換して送信するフォームを作ったので載せておきます。  
  
```html
<html>
<head>
</head>
<body>
    <form action="http://localhost/uploadImage" method="post" enctype="multipart/form-data">
        <p>アップロードするファイルを選択して下さい。</p>
        <p><input type="file" name="file"></p>
        <input type="submit" value="保存">

        <p>base64で送る用<input id="file" type="file"></p>
        <div id="result"></div>
    </form>
<script>
    var file = document.getElementById('file');
    var result = document.getElementById('result');

    function loadLocalImage(e) {
        // ファイル情報を取得
        var fileData = e.target.files[0];

        // 画像ファイル以外は処理を止める
        if (!fileData.type.match('image.*')) {
            alert('画像を選択してください');
            return;
        }

        // FileReaderオブジェクトを使ってファイル読み込み
        var reader = new FileReader();
        // ファイル読み込みに成功したときの処理
        reader.onload = function () {
            // ブラウザ上に画像を表示する
            var img = document.createElement('img');
            var base64_string = reader.result;
            img.src = base64_string;
            result.appendChild(img);
            var input_hidden = document.createElement('input');
            input_hidden.type = 'hidden';
            input_hidden.name = 'file_base64';
            input_hidden.value = base64_string;
            // input_hidden.value = base64_string.replace('data:image/jpeg;base64,', ''); // こっちでもいける。
            result.appendChild(input_hidden);
        }
        // ファイル読み込みを実行
        reader.readAsDataURL(fileData);
    }

    // ファイルが指定された時にloadLocalImage()を実行
    file.addEventListener('change', loadLocalImage, false);
</script>
</body>
</html>
```

  
## 参考  
- base64をUploadedFileに変換  
    - https://stackoverflow.com/questions/58509456/how-to-convert-base64-image-to-uploadedfile-laravel  
- HTMLで画像をbase64にする  
    - https://www.tam-tam.co.jp/tipsnote/javascript/post13538.html  
