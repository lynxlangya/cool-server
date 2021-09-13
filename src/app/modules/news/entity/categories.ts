import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from 'midwayjs-cool-core';
import { Column } from 'typeorm';

/**
 * 新闻分类
 */
@EntityModel('news_categories')
export class NewCategoriesEntity extends BaseEntity {
  @Column({ comment: '类别名称' })
  name: string;

  @Column({ comment: '类别描述' })
  description: string;

  @Column({ comment: '类别图标地址' })
  icon: string;

  @Column({ comment: '类别显示顺序', nullable: true })
  sort: number;

  @Column({ comment: '类别下文章数量', nullable: true })
  article_count: number;

  @Column({ comment: '封面图' })
  coverImage: string;
}
