import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from 'midwayjs-cool-core';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
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

  /**
   * @func 新增
   * @param {Object} param
   */
  async add(param) {
    const categories = await this.newCategoriesEntity.findOne({
      id: param.categoriesId,
    });
    if (_.isEmpty(categories)) {
      throw new CoolCommException('分类不存在~');
    }
    await this.newsArticlesEntity.save(param);
    return param.id;
  }

  async info(id: number) {
    /** 获取文章信息 */
    const info = await this.newsArticlesEntity.findOne({ id });
    /** 获取分类信息 */
    const categories = await this.newCategoriesEntity.findOne({
      id: info.categoriesId,
    });
    info.categoriesName = categories.name;
    return info;
  }
}
