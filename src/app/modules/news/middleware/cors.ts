import { Provide } from '@midwayjs/decorator';
import { IMidwayWebNext, IWebMiddleware } from '@midwayjs/web';
import { Context } from 'egg';

/**
 * 跨域中间件
 */

@Provide()
export class CorsMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      ctx.response.set('Access-Control-Allow-Origin', '*');
      await next();
    };
  }
}
