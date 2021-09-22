import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from 'midwayjs-cool-core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { NewsArticlesEntity } from '../entity/articles';
import { NewCategoriesEntity } from '../entity/categories';
import { Context } from 'egg';

/**
 * 描述
 */
@Provide()
export class NewsArticlesService extends BaseService {
  @Inject()
  ctx: Context;

  /** 文章接口 */
  @InjectEntityModel(NewsArticlesEntity)
  newsArticlesEntity: Repository<NewsArticlesEntity>;

  /** 分类接口 */
  @InjectEntityModel(NewCategoriesEntity)
  newCategoriesEntity: Repository<NewCategoriesEntity>;
  /**
   * 描述
   */
  async list() {
    const info = await this.newsArticlesEntity.find();
    // this.list();
    return info;
  }
}
