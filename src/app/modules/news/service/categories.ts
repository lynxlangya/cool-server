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
  async getArticles(id: number, order?: string): Promise<any> {
    const find = this.newsArticlesEntity.createQueryBuilder();
    if (order) {
      find.orderBy('readingsNumber', order === 'asc' ? 'ASC' : 'DESC');
    }
    find.where(`categoriesId = ${id}`);
    const list = await find.getManyAndCount();
    const info = {
      list: list[0],
      count: list[1],
    };
    return info;
  }
}
