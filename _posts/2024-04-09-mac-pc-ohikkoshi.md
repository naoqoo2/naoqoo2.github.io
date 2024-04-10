---
title: "Macの移行アシスタントで Intel → silicon にPC移行した時の話"
categories:
  - blog
tags:
  - mac
  - PC移行
---

移行アシスタントが便利で感動！  
短時間でPCの中身をごっそりコピーしてくれるからスムーズに移行が完了できる！  
しかし今回CPUがIntel → silicon(M3) に変わったためアプリによっては動かない問題が発生。。

## gitが動かない。。
gitが動かなくなっていたのでHomebrewで再インストールしようとしたらエラーが。

```
n.niikura@MacBook-Pro ~ % brew install git
/usr/local/Homebrew/Library/Homebrew/brew.sh: line 842: /usr/local/Homebrew/Library/Homebrew/vendor/portable-ruby/current/bin/ruby: Bad CPU type in executable
/usr/local/Homebrew/Library/Homebrew/brew.sh: line 842: /usr/local/Homebrew/Library/Homebrew/vendor/portable-ruby/current/bin/ruby: Undefined error: 0
Error: 'git' must be installed and in your PATH!
```

なるほど。CPUタイプが変わったからね。
ごにゃごにゃ解決する方法もあったけど大変そうだったのでHomebrewアンインストールからの再インストールで解決しました！


### Homebrew再インストール

アンインストールして

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

再インストール

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

※実行後に2個コマンド打てと言われるから打つ。
```
(echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/n.niikura/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```
### gitをインストール

```
brew install git
```

### pushもできない

gitは動くようになりましたがクローンしていたリポジトリがpushできないエラーも発生しました。

![gitが動かない](/assets/images/20240409/image.png)

これは調べるのも手間だったのでリポジトリをcloneし直して解決！

### FAQ
- なぜHomebrew使ったの？
    - Gitの公式ページのインストール方法の一番最初に紹介されてたのがHomebrewだったから。。
    https://git-scm.com/download/mac

### 参考

- https://rch850.hatenablog.com/entry/2021/12/11/021609

## おまけ：同様にdockerも動かない。。涙

アンインストールして再インストールしたら直ったのだけど、
しっかりアンインストールしないと起動できない現象にハマった。。
こちらの手順でアンインストールして解決。ありがたやー。

https://qiita.com/esu_eichi/items/72bcd5801971fee793fe

