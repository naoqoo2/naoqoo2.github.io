---
title: "Postmanで空配列を送る方法"
categories:
  - blog
tags:
  - Postman
  - 空配列
  - テスト
---

## form-dataではダメ

![alt text](/assets/images/20241128/image.png)

これだと配列の第一要素が空文字として送られてしまう。
要素があるので空配列ではない。

## rawでJSONで送ってあげればOK

![alt text](/assets/images/20241128/image-1.png)

これで空配列のテストができます！やったね！