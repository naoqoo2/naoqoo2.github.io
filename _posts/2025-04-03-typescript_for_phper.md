---
title: "PHPエンジニアがTypeScriptを30分で理解するためにAIに聞いたこと全まとめ"
categories:
  - blog
tags:
  - typescript
---

## 私:
typescriptについて教えてください。書けるようになりたいです。  
javascriptは書けます。  
phpエンジニアです。  

30分ほどで基礎を身につけたいです。

---

## アシスタント:

了解です！TypeScript（TS）はJavaScript（JS）のスーパーセットで、型（Type）を使えるのが最大の特徴です。PHPエンジニアでJSが書けるなら、めちゃくちゃスムーズに理解できますよ。30分で基礎を身につけられるよう、ポイントを絞ってお伝えします。

---

## 🔰 TypeScript 超入門（30分で基礎）

### ✅ 1. TypeScriptとは？

- JavaScriptに**型の仕組み**を追加した言語。
- `tsc`（TypeScript Compiler）で `.ts` → `.js` に変換して使います。
- **型安全**になるので、開発時にエラーが見つけやすく、保守性も上がる。

### ✅ 2. 基本の型（Type）

```ts
let count: number = 10;
let username: string = '新倉';
let isAdmin: boolean = true;
let tags: string[] = ['php', 'ts'];
let scores: number[] = [90, 80, 70];
```

PHPとの比較イメージ：

```php
$age = 30; // PHPでは型なしでも動くけど、TSは型を書く
```

### ✅ 3. 関数の型定義

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

引数と戻り値に型をつけられる！

### ✅ 4. オブジェクトに型をつける（インターフェース）

```ts
interface User {
  id: number;
  name: string;
  email?: string; // ?は省略可能
}

const user: User = {
  id: 1,
  name: '新倉'
};
```

### ✅ 5. 型のユニオン・リテラル型

```ts
let status: 'draft' | 'published' = 'draft';

function printId(id: number | string) {
  console.log('ID:', id);
}
```

複数の型を許容したり、特定の値だけ許すこともできる。

### ✅ 6. 型エイリアス（type）

```ts
type PostStatus = 'draft' | 'published' | 'archived';

type Post = {
  id: number;
  title: string;
  status: PostStatus;
};
```

### ✅ 7. any と unknown（ざっくり）

```ts
let anything: any = 'なんでもアリ';
let safeValue: unknown = 'これは型チェックが必要';
```

- any は使いすぎ注意（型チェックされない）
- unknown は安全な any

### ✅ 8. クラスも書けます

```ts
class Person {
  constructor(private name: string) {}

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
```

---

## 🔧 ちょい実践：簡単な関数

```ts
type Task = {
  id: number;
  title: string;
  done: boolean;
};

function completeTask(task: Task): Task {
  return { ...task, done: true };
}
```

---

## ✅ 開発に使うツール

- `tsc`：TypeScriptのコンパイラ
- `ts-node`：TSを直接実行できる
- VS Code：型エラーを即時に教えてくれるのでおすすめ！

---

## 💡 まずやるべきこと

1. VS Codeで `.ts` ファイルを作る  
2. 上のサンプルをコピペして動かしてみる  
3. 公式サイト or チュートリアルで手を動かす  

---

## 📚 おすすめ教材（無料）

- [TypeScript公式ハンドブック（日本語）](https://www.typescriptlang.org/ja/docs/)
- [ドットインストール - TypeScript入門](https://dotinstall.com/lessons/basic_typescript_v3)

---

## 私:

VSCodeでどうやって動かせますか？

---

## アシスタント:

ナイス質問です！VSCodeでTypeScriptを動かすには、簡単なセットアップが必要です。ここでは「ローカルで `.ts` ファイルを書いて、動かす」ための一番シンプルな方法を紹介します。

---

## ✅ Step 1: TypeScriptのインストール

```bash
mkdir my-ts-app
cd my-ts-app
npm init -y
npm install typescript --save-dev
```

---

## ✅ Step 2: 設定ファイルを作成

TypeScriptの設定ファイルを作ります。

```bash
npx tsc --init
```

これで `tsconfig.json` ができます（いろいろ書かれてますが、最初は気にしなくてOK）。

---

## ✅ Step 3: `.ts` ファイルを作る

VSCodeで `index.ts` を作って、こんなコードを書いてみましょう：

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("新倉"));
```

---

## ✅ Step 4: TypeScriptをコンパイルしてJSにする

以下のコマンドを実行します：

```bash
npx tsc
```

すると、index.js が出力されます（内容はJSに変換されたもの）。

---

## ✅ Step 5: 実行する

Node.jsを使って実行します。

```bash
node index.js
```

💡 もし node がない場合は [Node.js公式サイト](https://nodejs.org/ja) からインストールしてください。

---

## ファイル保存時に自動でJSに変換するには？

```bash
npx tsc --watch
```

これで .ts ファイルを保存するたびに、自動で .js に変換されます。開発がスムーズになります！

## ✅ BONUS：ts-node を使うともっとラク！

```bash
npm install -D ts-node
npx ts-node index.ts
```

これなら .js に変換せずに直接 .ts を実行できます！

---

## 私:

npxってなんですか？

---

## アシスタント:

いいところに気づきましたね！`npx` は初心者がつまずきやすいポイントでもあるので、簡単にわかりやすく説明しますね。

---

## 🔧 `npx`とは？

`npx` は Node.jsに付属しているコマンドで、

📦 「ローカル or 一時的にインストールされたパッケージ（npmのコマンド）を、簡単に実行するためのもの」

---

## 🎯 例で理解する！

```bash
npx tsc
```

これは、「プロジェクトにインストールされている `typescript` の `tsc` コマンド（コンパイラ）を実行する」という意味です。

- 🔸 自分のPCにグローバルインストールしてなくてもOK
- 🔸 node_modules/.bin/tsc を内部的に実行してくれます

---

## 🤔 なぜ `npx` が便利なの？

- グローバルインストール不要  
  - → npm install -g typescript しなくていい
- プロジェクトごとのバージョンが使える  
  - → そのプロジェクトで使ってるバージョンだけ使える

---

## 📌 使いどころの例

| やりたいこと               | コマンド             |
|----------------------------|----------------------|
| TypeScriptをコンパイルする | npx tsc              |
| 初期設定ファイルを作る     | npx tsc --init       |
| TSを直接実行する           | npx ts-node index.ts |

---

## ☝️ `npm` との違い

| npm                         | npx                          |
|-----------------------------|------------------------------|
| パッケージをインストール     | コマンドを実行               |
| 例: npm install typescript | 例: npx tsc                  |

TypeScriptの学習中は `npx tsc` と `npx ts-node` を使うことがよくあります！

---

## 私:

なるほど。他にtypescriptで理解しておくべき点はありますか？

---

## アシスタント:

おお、いい感じに理解深まってますね！🎯  
JavaScript経験者＆PHPエンジニアのあなたが、TypeScriptを使いこなすために “本当に押さえておきたいポイント” をまとめます。

---

## ✅ TypeScriptで理解すべき5つの重要ポイント

---

### 1. 型の使いどころ（迷ったら使うべき場面）

TypeScriptでは 「どこに型をつけるべきか？」 が大事です。

✅ 関数の引数と戻り値  
✅ APIレスポンスなどのオブジェクト構造  
✅ 状態（state）として保持するデータ

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

---

### 2. 型の再利用（interface / type）

何度も使う構造は `interface` または `type` で定義して使い回すと便利です。

```ts
type User = {
  id: number;
  name: string;
  email?: string; // 省略可
};

function sendEmail(user: User) {
  console.log(user.email);
}
```

---

### 3. 型推論を活かす

TypeScriptはすごく賢くて、代入した値から型を「推論」してくれます。

```ts
let count = 1; // → 自動的に number 型になる
```

なので、無理に全部に型を書かなくてもOK！  
ただし、関数の引数や戻り値、外部とのインターフェースには明示しましょう。

---

### 4. Enum・リテラル型を使うと堅牢に

```ts
type Status = 'draft' | 'published' | 'archived';

function publish(status: Status) {
  // statusは3つのどれかしか受け取れない
}
```

これはAPIのstatus管理とか、Vueの表示切り替えなどで大活躍します。

---

### 5. ユニオン型 / インターセクション型（応用だけど便利）

```ts
// ユニオン型
function printId(id: number | string) {
  console.log(id);
}

// インターセクション型（&）
type A = { foo: string };
type B = { bar: number };
type AB = A & B; // 両方の型を満たす
```

条件分岐・型分岐がしやすくなるので、コードが安全＆読みやすくなります。

---

## 👀 他にも知っておくと便利なワード

| 概念           | 説明                              |
|----------------|-----------------------------------|
| `Partial<T>`   | 全てのプロパティを省略可にする    |
| `Readonly<T>`  | 読み取り専用にする                |
| `Record<K, T>` | キーと値の型をセットで定義できる  |
| `Pick<T, K>`   | 特定のプロパティだけ取り出す      |
| `Omit<T, K>`   | 特定のプロパティを除外する        |

```ts
type User = { id: number; name: string; email: string };
type UserName = Pick<User, 'name'>;
```

PHPの配列操作とか連想配列のキー制御が好きなら、かなり気に入るはずです。

---

## 🧠 実践でやっておきたいこと

- 簡単なTodoアプリ（配列＋オブジェクト操作）
- APIレスポンスを型定義して扱う
- VueやReactと組み合わせて使う（めちゃくちゃ相性良い）

---

TypeScriptって、最初はちょっと堅く見えるけど、わかってくると 「壊れないJS」 を書ける安心感がクセになります。

「これ実装するときTSでどう書けばいい？」みたいなのがあったら、実際のコード一緒に書いてみましょうか？  
実務ベースで学ぶと早いです！

## 私:

type UserName = Pick<User, 'name'>;
は
type UserName = User.name;
ではダメなの？
と思ったけど、型をセットしてるのか。

---

## アシスタント:

おおっ、その気づき、めちゃくちゃ鋭いです！！💡  
そうなんです、まさにあなたが言った通り、

> 「型をセットしてる」

っていうのが超重要なポイントです。

---

### 🔍 比較してみましょう

```ts
type User = {
  id: number;
  name: string;
  email: string;
};
```

#### ❌ これはエラーになる：

```ts
// ❌ これは型じゃなくてプロパティアクセスだからダメ
type UserName = User.name;
```

↑ これは「User という型の中の name を取り出す」つもりなんだけど、TypeScriptはそれを直接やらせてくれません。

---

### ✅ こっちが正解：

```ts
type UserName = Pick<User, 'name'>;
```

これはこういう意味です：

- `Pick<T, K>` は「T型からKのキーだけを持つ型を作る」
- 結果として `{ name: string }` という型になる

---

### ☝️ じゃあ「name の型だけ欲しい」ってときは？

```ts
type UserNameOnly = User['name']; // string
```

これは **インデックスアクセス型** といって、型の中から型だけを取り出せます。

> `User['name']` は `string` 型を返す  
> `Pick<User, 'name'>` は `{ name: string }` 型を返す

---

### ✅ まとめると：

| 書き方                   | 結果の型            | 使いたい場面              |
|--------------------------|----------------------|----------------------------|
| `User['name']`           | `string`             | 値の型だけほしい           |
| `Pick<User, 'name'>`     | `{ name: string }`   | オブジェクトとして使いたい |
| `Omit<User, 'email'>`    | `{ id, name }`       | 特定のプロパティを除外     |

---

この辺りに慣れてくると、TSの型を「型安全なレゴブロック」みたいに組み立てて使えるようになります🧱
他にも「この型どうやって抜き出すの？」とか「Form入力用の型だけ作りたい」とかあったらぜひ聞いてください〜！

---

## 私:

User['name'] これで型が取得できるんですね！
phpだと連想配列で値が取れるのでややこしいですね！

---

## アシスタント:

まさにそれです！！👏✨  
PHPの連想配列で慣れてると、`User['name']` が値を取る構文に見えちゃいますよね！でもTypeScriptでは「型の世界」なんです。

---

## 💡 簡単に言うと：

| 言語      | `User['name']` の意味               |
|-----------|-------------------------------------|
| PHP       | 配列から値を取り出す（実行時）     |
| TypeScript | 型から型を取り出す（コンパイル時） |

---

## ✅ TypeScriptでの使いどころ

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type UserName = User['name']; // 👈 string型になる
```

これを使うと、元の型から安全に一貫性を保てます。たとえば、入力フォームやバリデーションなどで部分的に型を使いたいときに超便利。

---

## ✅ まとめ

| やりたいこと                         | PHP                       | TypeScript                   |
|--------------------------------------|----------------------------|------------------------------|
| 値を取得                             | `$user['name']`            | `user.name`（実行時）        |
| プロパティ名の型を取得（string型） | ―                          | `User['name']`               |
| プロパティだけを抽出した型を作る     | ―                          | `Pick<User, 'name'>`         |

---

この違いを意識すると、TSの型操作がグッと分かりやすくなります！

## 私:

ありがとうございました！