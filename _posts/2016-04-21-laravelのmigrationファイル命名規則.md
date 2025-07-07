---
title: "laravelのmigrationファイル命名規則"
categories:
  - blog
tags:
  - migration
  - Laravel
  - laravel5

---

# migrationファイル命名規則  
今後は下記ルールで作成することにしました。  
  
## テーブル作成時  
php artisan make:migration create_{テーブル名} --create={テーブル名}  
例）php artisan make:migration create_users --create=users  
  
## テーブル変更時  
php artisan make:migration modify_{テーブル名}_{YYYYMMDD} --table={テーブル名}  
例）php artisan make:migration modify_users_20160128 --table=users  
  
# 決める上で考慮したこと  
http://readouble.com/laravel/5/1/ja/migrations.html#generating-migrations  
をベースに下記のようにしました。  
  
- カラム名はファイル名に含めない  
    - 複数カラムの場合や開発途中で名称変更となった場合に手間なので  
- 日付でユニーク化  
    - 案件名でのユニークも考えたが、日付は裏切らない  
- _tableは省略  
    - だってテーブル操作だし  
  
# 命名規則がなかったことによる失敗談  
命名規則を決めるにあたって、下記のような背景がありました。  
## プロジェクトXにて  
ある日、usersテーブルにカラムAを追加しました。  
  
> php artisan make:migration modify_users  
>   
> ```php
> class ModifyUsers extends Migration {  
>     {カラムAの記述}  
> }  
> ```  
>   
> php artisan migrate（カラムAが追加された）  
  
数ヶ月後、ふたたびusersテーブルにカラムBを追加しました。  
  
> php artisan make:migration modify_users  
>   
> ```php
> class ModifyUsers extends Migration {  
>     {カラムBの記述}  
> }  
> ```  
>   
> php artisan migrate（カラムBが追加された）  
  
これ、順に実行した場合は問題ないのですが、  
  
## 問題発生  
  
DBを一から作る際にエラーとなりました。。。  
  
> PHP Fatal error: Cannot redeclare class ModifyUsers  
  
クラス名が同じためエラー。。PHPだし、まぁそりゃそうだよね。  
  
## ひとまず解決へ  
  
片方のクラス名だけ変更して解決を試みたのですが、  
どうやらmigrateはファイル名からクラスを呼び出すらしく、エラー解消されず。。  
結局、ファイル名も変更して解決しました。  
  
## 再発を防ぐために  
いっそmigrationコマンドでファイル作成時にバリデーションしてくれればいいのに。。  
と思いつつ、  
今後このようなことが起きないよう命名規則を決めることにしました。  
  
  
# 最後に  
命名規則を決めておけば、迷いもなくスムーズに開発が進みます。  
（このような問題も発生しませんしね）  
ルールがまだない方は是非決めてみてはいかがでしょうか。  
  
それではステキなmigrationライフを。  
