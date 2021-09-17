import { Provide } from '@midwayjs/decorator';
import { IMidwayWebNext, IWebMiddleware } from '@midwayjs/web';
import { Context } from 'egg';

const LOG = console.log;

@Provide()
export class ReportMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      /** 控制器之前执行的逻辑 */
      const startTime = Date.now();
      /** 执行写一个Web中间件，最后执行到控制器 */
      await next();
      /** 控制器之后执行的逻辑 */
      LOG('RUN TIME ------> ', Date.now() - startTime, 'ms');
    };
  }
}
