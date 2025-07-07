---
title: "LaravelでタスクAが成功したらタスクBを実行する"
categories:
  - blog
tags:
  - Laravel

---

Laravelのタスクスケジュール便利ですよね。  
  
ジョブ管理ツールのように『タスクAが成功したらタスクBを処理する』といった事もできました。  
  
## タスクAが成功したらタスクBを処理する  
  
**app/Console/Kernel.php**  

```php
class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
    {
        //毎時タスクAを実行する。成功した場合にタスクBも実行する。
        $schedule->command('app:taskB')->hourly()->when(function () {
                return Artisan::call('app:taskA');
        });
    }
}
```

## 解説  
  
`when`メソッドはtrueのときにタスクを実行します。  
`Artisan::call`はexitコードを返すので、taskAを下記のようにすることで処理結果の判定が可能です。  
  
**app/Console/Commands/taskA.php**  

```php
class taskA extends Command
{
    protected $signature = 'app:taskA';

    public function handle()
    {
        if (処理) {
            // 成功したら1を返す
            return 1;
        }

        // 失敗したら0を返す（何も返さない場合も0だけど明示的に）
        return 0;
    }
}
```

ステキです。  
