import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { NewsArticlesEntity } from '../../entity/articles';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: NewsArticlesEntity,
})
export class NewsOpenArticlesController extends BaseController {}
