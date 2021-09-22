import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { NewsArticlesEntity } from '../../entity/articles';
import { NewsArticlesService } from '../../service/articles';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: NewsArticlesEntity,
  service: NewsArticlesService,
})
export class OpenNewsArticlesController extends BaseController {}
