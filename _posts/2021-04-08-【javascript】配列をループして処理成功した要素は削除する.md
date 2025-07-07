---
title: "【javascript】配列をループして処理成功した要素は削除する"
categories:
  - blog
tags:
  - JavaScript

---

Vueなど配列データと見た目が連動（データバインディング）しているときに、  
処理成功した要素だけ削除して、失敗した要素は残しておきたい。ということがありました。  
  
ループ（forEach？Map使う？）と要素の削除（shift？deleteだとundefinedになるだけで要素は残るのか...）に試行錯誤した結果、forとspliceに落ち着いたのでそのメモ。  
  
```js
for (let i = 0; i < this.files.length; i++) {
  const file = this.files[i];
  file.uploading = true; // 処理中だよ（見た目を変える）
  await upload(file).then(() => {
    // 処理成功したら要素を削除
    this.files.splice(i, 1);
    // 要素を削除（splice）したことで添字が詰まるので、i--しないと次の要素がスキップされてしまう
    i--;
  }).catch(error => {
    file.uploading = false; // 処理は終わったけど...（見た目を変える）
    file.error = true; // エラーになったよ（見た目を変える）
  });
}
```  
