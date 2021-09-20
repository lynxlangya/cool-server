import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { Context } from 'egg';
import { NewsArticlesEntity } from '../../entity/articles';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: NewsArticlesEntity,
  /** 查询逻辑 */
  pageQueryOp: {
    keyWordLikeFields: ['title', 'outline', 'author'],
  },
  insertParam: async (ctx: Context) => {
    return {
      userId: ctx.admin.userId,
    };
  },
})
export class NewsArticlesController extends BaseController {}
