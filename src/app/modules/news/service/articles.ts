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
    /** 新增统计文章数量 */
    categories.article_count += 1;
    await this.newCategoriesEntity.save(categories);
    await this.newsArticlesEntity.save(param);
    return param.id;
  }

  /**
   * @func 编辑
   * @param {Object} param
   */
  async update(param: any) {
    /** 文章是否存在 */
    const exist = await this.newsArticlesEntity.findOne({ id: param.id });
    /** 更改前 - 文章分类归属 */
    const oldInfo = await this.newCategoriesEntity
      .createQueryBuilder()
      .where(`id = ${exist.categoriesId}`)
      .getOne();
    /** 更改后 - 文章分类归属 */
    const newInfo = await this.newCategoriesEntity.findOne({
      id: param.categoriesId,
    });
    /** 判断文章分类归属是否有变化 */
    if (oldInfo.id !== newInfo.id) {
      oldInfo.article_count -= 1;
      newInfo.article_count += 1;
      await this.newCategoriesEntity.save(newInfo);
    }
    if (_.isEmpty(exist)) {
      throw new CoolCommException('文章不存在~');
    }
    await this.newsArticlesEntity.save(param);
    return param.id;
  }

  /**
   * @func 删除
   * @param {number} ids
   */
  async delete(ids: number[]) {
    const info = await this.newsArticlesEntity.findByIds(ids);
    if (ids.length !== info.length) {
      throw new CoolCommException('文章不存在～');
    }
    // FIX: 总觉得还有更优雅的处理方式
    info.forEach(async it => {
      const categories = await this.newCategoriesEntity.findOne({ id: it.id });
      if (categories.article_count > 0) {
        categories.article_count -= 1;
        await this.newCategoriesEntity.save(categories);
      }
    });
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
    const sql = `
    SELECT
      a.*,
      b.name AS categoriesName
    FROM
      news_articles a
      LEFT JOIN news_categories b ON b.id = a.categoriesId`;
    const list = await this.newsArticlesEntity.query(sql);
    return list;
  }

  /**
   * @func 分页查询处理
   * @param {Object} query
   */
  async page(query: any) {
    const { keyWord, author } = query;
    const sql = `
    SELECT
      a.*,
      b.name AS categoriesName
    FROM
      news_articles a
      LEFT JOIN news_categories b ON b.id = a.categoriesId
    WHERE 1 = 1
      ${this.setSql(
        keyWord,
        'AND (a.title LIKE ? OR a.outline LIKE ? OR a.content LIKE ?)',
        [`%${keyWord}%`, `%${keyWord}%`, `%${keyWord}%`]
      )}
      ${this.setSql(author, 'AND (a.author LIKE ?)', [`%${author}%`])}
    `;
    return this.sqlRenderPage(sql, query);
  }
}
