import { Provide } from '@midwayjs/decorator';
import { BaseService } from 'midwayjs-cool-core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { NewsArticlesEntity } from '../entity/articles';

/**
 * 分类接口请求处理
 */
@Provide()
export class NewsCategoriesService extends BaseService {
  /** 文章接口 */
  @InjectEntityModel(NewsArticlesEntity)
  newsArticlesEntity: Repository<NewsArticlesEntity>;

  /** 根据分类id获取文章列表 */
  async getArticles(id: number): Promise<any> {
    const sql = `select * from news_articles where categoriesId = ${id}`;
    return await this.nativeQuery(sql);
  }
}
