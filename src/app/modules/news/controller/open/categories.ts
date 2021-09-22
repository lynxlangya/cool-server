import { Get, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { NewCategoriesEntity } from '../../entity/categories';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { NewsArticlesEntity } from '../../entity/articles';

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

  /** 根据分类 id 获取文章 */
  @Get('/getArticles')
  async stock(@Query('id') id: number) {
    console.log('id ---->', id);
    const sql = `SELECT * FROM news_articles WHERE categoriesId = ${id}`;
    const list = await this.newsArticlesEntity.query(sql);
    return this.ok(list);
  }
}
