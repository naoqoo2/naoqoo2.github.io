---
title: "Playwright でページの一部だけを自動化する方法"
categories:
  - blog
tags:
  - Playwright
  - E2Eテスト
  - ブラウザ自動化
---

これまで Selenium IDE を使って

- 「ページの一部だけを自動化したい」
- 「ちょっとした操作を繰り返したい」

という用途でブラウザ操作を自動化していました。  
テストのために特定のフォームだけ自動入力したりとかね。


しかし最近、Selenium IDE がサポート終了となり Chrome の拡張機能で使えなくなってしまったため、AIちゃんにおすすめされた Playwright を試してみることにしました。

結論から言うと、Selenium IDE 的な使い方もできて満足！

この記事では、

- Playwright のインストール方法
- Selenium IDE っぽく「ページの一部だけ自動化」する方法
- ハマりポイント（ウィンドウが閉じる問題）

をまとめます。

# Playwright のインストール方法

Node.js が入っていれば、まずはこれだけで試せます。

```bash
npx playwright codegen https://example.com
```

初回は Playwright 本体やブラウザのインストールが走ります。もし途中でエラーが出た場合は、以下を実行してください。

```bash
npx playwright install
```

これで録画モード（codegen）が起動し、操作すると自動でコードが生成されます。

# Playwright は「開いているウィンドウ」を操作できない

- すでに開いている Chrome / タブを対象にすることはできない
- Playwright が起動したブラウザのみ操作対象

となります。（Selenium IDE も同様）

昔の時代の Selenium IDE は「今見ているページの一部だけ自動化」ができて便利だったのになぁ。。  

ということで工夫が必要です。

# ページの一部だけを自動化する方法

ここで活躍するのが `await page.pause()` です。

基本の考え方

- Playwright でブラウザを起動する
- 対象ページを開く
- pause で止める
- 自動化したい処理を実行
- また pause で止める

実際のコード例

```ts
import { test } from '@playwright/test';

test('部分的に自動化する', async ({ page }) => {
  // ① まず起動してページを開く
  await page.goto('https://example.com');

  // ② 手動操作したいところで止める
  await page.pause();

  // ③ 自動実行したい処理
  await page.locator('#submit').click();
  await page.locator('#count').fill('3');

  // ④ 再び止める（結果確認用）
  await page.pause();
});
```

この状態で

```bash
npx playwright test --debug
```

を実行すると、

- pause の位置で完全に停止
- ブラウザを手動で操作できる
- Inspector から再開できる

という流れになります。旧Selenium IDE の「途中から操作 → 再生」にかなり近い体験ができます。

# なぜ pause を挟むのが重要なのか

Playwright は

- テストが最後まで走る
- 終了するとブラウザを自動で閉じる

という設計です。

つまり、

- pause を入れない
- 自動処理が最後まで終わる

と、ウィンドウが一瞬で閉じてしまいます。

「確認したい」「途中で操作したい」場合は、必ず `await page.pause()` を入れるのがポイントです。

# まとめ

- Selenium IDE の代替として Playwright は十分使える
- ただし既に開いているウィンドウは操作できない
- `await page.pause()` を使えば途中で止めたり、ページの一部だけ自動化できる
- pause を入れないと最後にウィンドウが閉じるので注意

旧Selenium IDE に慣れている人ほど、最初は思想の違いに戸惑いますが、pause を使いこなせると一気に世界が変わると感じました。

「ちょっとした自動化」「デバッグ用途」でも Playwright、かなりアリです。
