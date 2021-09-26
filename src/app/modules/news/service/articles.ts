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
    const exist = await this.newsArticlesEntity.findOne({ id: param.id });
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
   * 总结：
   * 红楼梦整部小说，将女性的地位塑造的非常高。
   * 红楼梦自问世以来，围绕它的争论就没有停止过，以后大概率也会继续争下去
   * 我觉得百家争鸣是好事，但是过份的去分析和解读红楼梦这件事本身就失去了读书的意义，以及红楼梦带给我们的启示
   * 日本一位禅师 - 山本玄绛曾在龙泽寺讲经，说过一句话发人省醒：
   * “一切诸经皆不过是敲门砖，要敲开门，唤出其中的人来，此人即是你自己。”
   * 就是说你是什么样的人，就会读出什么样的红楼梦，就会以什么样的方式去解读红楼梦
   * 而读书就是一个发现自我的过程，这才是红楼梦的本意。
   * 红楼梦的第一章叫《甄士隐梦幻识通灵，贾雨村风尘怀闺秀》
   * 这其中有两个人的名字：甄士隐、贾雨村
   * 作者随后也对这两个名字做了解释：
   * 曾历过一番梦幻之后，故将真事隐去，故曰“甄士隐”云云
   * 我虽不学无文，又何妨用假语村言敷演出来?故曰“贾雨村”云云
   * 其实，作者的本意就是希望这部小说能够对读者起到一定的警醒作用
   * 石头在和空空道人有一段对话，我觉得就是作者对红楼梦这本书的定位，大概是这个意思：
   * 空空道人说：“你这上面的故事一没有具体的朝代可拷证，二没有大忠大贤，明君能臣，就是一些女子的故事，没大的意思”
   * 石头是这么说的：“大师何必太执着于朝代纪年？历来的野史无非是假借汉、唐之名。然后编造一些自相矛盾的故事。
   * 而我这半世看到听到的这些女子，虽说不上比前代书中所有人都强，但是仔细读起来还是别有一番滋味的。”
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
