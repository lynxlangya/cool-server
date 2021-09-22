import { Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { NewCategoriesEntity } from '../../entity/categories';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { NewsArticlesEntity } from '../../entity/articles';
import { NewsCategoriesService } from '../../service/categories';

/**
 * 描述
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: NewCategoriesEntity,
})
export class OpenNewCategoriesController extends BaseController {
  @InjectEntityModel(NewsArticlesEntity)
  newsArticlesEntity: Repository<NewsArticlesEntity>;

  @Inject()
  newsCategoriesService: NewsCategoriesService;

  /** 根据分类 id 获取文章 */
  @Get('/getArticles')
  async stock(@Query('id') id: number) {
    //  const list = await this.newsArticlesEntity.query(sql);
    const list = await this.newsCategoriesService.getArticles(id);
    return this.ok(list);
  }
}
