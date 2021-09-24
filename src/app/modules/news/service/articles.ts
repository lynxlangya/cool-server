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
   * @func 新增
   * @param {Object} param
   */
  async add(param: any) {
    const categories = await this.newCategoriesEntity.findOne({
      id: param.categoriesId,
    });
    if (_.isEmpty(categories)) {
      throw new CoolCommException('分类不存在~');
    }
    await this.newsArticlesEntity.save(param);
    return param.id;
  }

  /**
   * @func 获取文章详细信息
   * @param {number} id
   */
  async info(id: number) {
    /** 获取文章信息 */
    const info = await this.newsArticlesEntity.findOne({ id });
    /** 获取分类信息 */
    const categories = await this.newCategoriesEntity.findOne({
      id: info.categoriesId,
    });
    /** 分类名称赋值 */
    info.categoriesName = categories.name;
    return info;
  }

  /**
   * @func 获取所有文章
   */
  async list() {
    const sql = `SELECT
      a.*,
      b.name AS categoriesName
    FROM
      news_articles a
      LEFT JOIN news_categories b ON b.id = a.categoriesId;`;
    const list = await this.newsArticlesEntity.query(sql);
    return list;
  }

  /**
   * @func 分页查询处理
   * @desc 📝
   */
  page(query) {
    // const { keyWord } = query;
    const sql = `SELECT
      a.*,
      b.name AS categoriesName
    FROM
      news_articles a
      LEFT JOIN news_categories b ON b.id = a.categoriesId;`;
    return this.sqlRenderPage(sql, query);
  }
}
