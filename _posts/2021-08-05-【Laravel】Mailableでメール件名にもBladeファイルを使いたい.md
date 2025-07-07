---
title: "【Laravel】Mailableでメール件名にもBladeファイルを使いたい"
categories:
  - blog
tags:
  - Laravel

---

## なぜやりたいか  
  
- 件名と本文を同じところに定義したい！  
    - エンジニア以外でもパッとわかるように。  
- 件名にも変数使いたいとき  
    - 本文と同じようにbladeで処理を統一したい  
  
## いままでは？  
  
こんな感じでディレクトリ分かれがち。  
  
- resources/lang/ja/hoge.php  
- resources/views/emails/hoge.blade.php  
  
```php
return $this
    ->subject(__('hoge.subject'))
    ->text('emails.hoge')
    ->with(['data' => $data]);
}
```

  
## 件名もBlade使う  
  
フォルダを切って、件名と本文のファイルを用意。  
  
- resources/views/emails/hoge/subject.blade.php  
- resources/views/emails/hoge/body.blade.php  
  
`subject()` 内で `view()` を使う。  
  
```php
return $this
    ->subject(view('emails.hoge.subject'))
    ->text('emails.hoge.body')
    ->with(['data' => $data]);
}
```

## IDEが改行含みがち  
  
IDE（VSCodeとか）がファイル保存時に改行保管してくれちゃったりする。  
  
  
![image.png](/assets/images/20210805/80ca3f80-0685-17a0-e88f-922690ee8a46.png)  
  
メール件名では改行取り除きたいので除去してあげる。  
  
```php
return $this
    ->subject(str_replace(PHP_EOL, '', view('emails.hoge.subject')))
    ->text('emails.hoge.body')
    ->with(['data' => $data]);
}
```

## 件名でも変数使いたい場合はこちら  
  
```php
return $this
    ->subject(str_replace(PHP_EOL, '', view('emails.hoge.subject')->with(['data' => $data])))
    ->text('emails.hoge.body')
    ->with(['data' => $data]);
}
```  
