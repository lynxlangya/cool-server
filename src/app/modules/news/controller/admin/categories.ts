import { Get, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { Context } from 'vm';
import { NewCategoriesEntity } from '../../entity/categories';

/**
 * 新闻分类接口
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: NewCategoriesEntity,
  insertParam: async (ctx: Context) => {
    return { userId: ctx.admin.userId };
  },
  pageQueryOp: {
    keyWordLikeFields: ['name', 'description'],
  },
})
export class NewAdminCategoriesController extends BaseController {
  /** 其他接口 */
  @Get('/other')
  async other() {
    const obj = {
      list: [{ name: '1', id: 2 }],
      message: 'Hello this is /other api - GET',
    };
    return this.ok(obj);
  }

  @Post('/stock')
  async stock() {
    const message = 'Hello this is /stock api - POST';
    return this.ok(message);
  }
}
