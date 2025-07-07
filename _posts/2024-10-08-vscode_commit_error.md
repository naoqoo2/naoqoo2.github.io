---
title: "VSCodeのGUIからコミットしようとするとpre-commitでエラーになってコミットできない！"
categories:
  - blog
tags:
  - VSCode
  - husky
  - pre-commit
  - lint
---

## 現象

VSCodeのGUIからコミットしようとすると lint-staged で `Current directory is not a git directory!` となりエラーとなる。

コマンドラインからはcommitできる。

## 調査方法

いろいろ試行錯誤したのでメモしておきます。

### 調査1. commitコマンドの違い

VSCodeのGUIからコミットする場合は下記コマンドが実行されている模様

```
git -c user.useConfigOnly=true commit --quiet --allow-empty-message --file -
```

`-c user.useConfigOnly=true` オプションが怪しげだったので、コマンドラインで叩いてみると確かにエラーになった。。

```
% git -c user.useConfigOnly=true commit
husky - pre-commit hook exited with code 1 (error)
```


## 調査2. npmのバージョン（パス）が異なっていた

pre-commitに下記デバッグを仕込んだところ、コマンドライン実行と一部PATHが異なっていた。

```
echo "Node path: $(which node)" > /tmp/husky-debug.log
echo "NPM path: $(which npm)" >> /tmp/husky-debug.log
echo "NPX path: $(which npx)" >> /tmp/husky-debug.log
echo "Node version: $(node -v)" >> /tmp/husky-debug.log
echo "NPM version: $(npm -v)" >> /tmp/husky-debug.log
echo "NPX version: $(npx -v)" >> /tmp/husky-debug.log
```


```
# husky
Node path: /Users/n.niikura/.asdf/shims/node
NPM path: /usr/local/bin/npm
NPX path: /usr/local/bin/npx
Node version: v20.15.0
NPM version: 8.15.0
NPX version: 8.15.0

# ターミナル
Node path: /Users/n.niikura/.asdf/shims/node
NPM path: /Users/n.niikura/.asdf/shims/npm
NPX path: /Users/n.niikura/.asdf/shims/npx
Node version: v20.15.0
NPM version: 10.9.0
NPX version: 10.9.0
```

これはpre-commitに下記を追加で統一できた。が原因はこれではなかった。

```
export PATH="$HOME/.asdf/shims:$PATH"
```

## 調査3. エラーログを深掘り

下記のようにpre-commitにログ出力処理を加えてみた。

```
npx lint-staged --cwd hoge/fuga 2> /tmp/husky-error.log
```

が、詳細な情報は得られず。。

```
% cat /tmp/husky-error.log 
✖ Current directory is not a git directory!
```

ネットで調べてたら -d というデバッグモードオプションがあったので付けてみた。

```
npx lint-staged -d 2> /tmp/husky-error.log
```

すると、なんということでしょう！すごい量の情報が！(嬉)

```
% cat /tmp/husky-error.log
2024-10-08T10:24:10.691Z lint-staged:bin Options parsed from command-line: {
  allowEmpty: false,
  concurrent: true,
  configPath: undefined,
  cwd: undefined,
  debug: true,
  diff: undefined,
  diffFilter: undefined,
  maxArgLength: undefined,
  quiet: false,
  relative: false,
  shell: false,
  stash: true,
  verbose: false
}
2024-10-08T10:24:10.692Z lint-staged:validateOptions Validating options...
2024-10-08T10:24:10.693Z lint-staged:validateOptions Validated options!
2024-10-08T10:24:10.693Z lint-staged Unset GIT_LITERAL_PATHSPECS (was `undefined`)
2024-10-08T10:24:10.693Z lint-staged:runAll Running all linter scripts...
2024-10-08T10:24:10.693Z lint-staged:runAll Using working directory `/Users/n.niikura/Documents/app/hoge-project`
2024-10-08T10:24:10.693Z lint-staged:resolveGitRepo Resolving git repo from `/Users/n.niikura/Documents/app/hoge-project`
2024-10-08T10:24:10.693Z lint-staged:resolveGitRepo Unset GIT_DIR (was `undefined`)
2024-10-08T10:24:10.693Z lint-staged:resolveGitRepo Unset GIT_WORK_TREE (was `undefined`)
2024-10-08T10:24:10.693Z lint-staged:execGit Running git command [ 'rev-parse', '--show-prefix' ]
2024-10-08T10:24:10.722Z lint-staged:resolveGitRepo Failed to resolve git repo with error: Error: error: bogus format in GIT_CONFIG_PARAMETERS
fatal: unable to parse command-line config
    at execGit (file:///Users/n.niikura/Documents/app/hoge-project/node_modules/lint-staged/lib/execGit.js:25:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async resolveGitRepo (file:///Users/n.niikura/Documents/app/hoge-project/node_modules/lint-staged/lib/resolveGitRepo.js:58:30)
    at async runAll (file:///Users/n.niikura/Documents/app/hoge-project/node_modules/lint-staged/lib/runAll.js:94:36)
    at async lintStaged (file:///Users/n.niikura/Documents/app/hoge-project/node_modules/lint-staged/lib/index.js:107:17)
✖ Current directory is not a git directory!
```

`error: bogus format in GIT_CONFIG_PARAMETERS` ということで、GIT_CONFIG_PARAMETERSが何やらおかしいらしい。

pre-commit内で
`unset GIT_CONFIG_PARAMETERS`
することでコミットできるようになりました！


`GIT_CONFIG_PARAMETERS` を出力してみるとこんな感じ。なるほど。commitのオプションが入ってるのね。

```
echo "GIT_CONFIG_PARAMETERS : $GIT_CONFIG_PARAMETERS" >> /tmp/husky-debug.log

% cat /tmp/husky-debug.log  
GIT_CONFIG_PARAMETERS : 'user.useConfigOnly'='true'
```

## 原因と対策

pre-commitを直接編集すると他のメンバーに影響出てしまうので、
`~/.huskyrc` に下記を追加して解消した。

```
unset GIT_CONFIG_PARAMETERS
```

ただ本質的な解決策ではないので詳しい人いたら教えてください🙇‍♂️