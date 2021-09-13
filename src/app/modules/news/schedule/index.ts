// xxx/schedule/hello.ts
import { Provide, Inject, Schedule, CommonSchedule } from '@midwayjs/decorator';
import { Context } from 'egg';

@Provide()
@Schedule({
  // interval: 1000 * 60 * 60, // 2.333s 间隔
  type: 'worker', // 指定某一个 worker 执行
  /** 定时任务规则： https://cool-js.com/node/core/task.html#%E7%B1%BB%E5%9E%8Btype */
  cron: '0 0 0 * * *', // 每天 0 点执行一次
  // cron: '0 0 */3 * * *',
})
export class HelloCron implements CommonSchedule {
  @Inject()
  ctx: Context;

  // 定时执行的具体任务
  async exec() {
    this.ctx.logger.info(process.pid, 'hello');
  }
}
