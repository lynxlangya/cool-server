import { Provide } from '@midwayjs/decorator';
import { IMidwayWebNext, IWebMiddleware } from '@midwayjs/web';
import { Context } from 'egg';

@Provide()
export class LoggerMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      console.log('Middleware ----> API TEST');
      await next();
    };
  }
}
