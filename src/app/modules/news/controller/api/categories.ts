import { Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { NewCategoriesEntity } from '../../entity/categories';

/**
 * 新闻分类接口
 */
@Provide()
@CoolController({
  api: ['info', 'list', 'page'],
  entity: NewCategoriesEntity,
})
export class NewPublicCategoriesController extends BaseController {}
