import { Provide } from '@midwayjs/decorator';
import { IMidwayWebNext, IWebMiddleware } from '@midwayjs/web';
import { Context } from 'egg';

@Provide()
export class AddressMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      console.log('Middleware ----> API Address');
      console.log('PATH:', ctx.request.url);
      console.log('IP ADDRESS:', ctx.request.header.host);
      await next();
    };
  }
}
