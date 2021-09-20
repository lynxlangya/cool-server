import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from 'midwayjs-cool-core';
import { Column } from 'typeorm';

/** 新闻文章 */
@EntityModel('news_articles')
export class NewsArticlesEntity extends BaseEntity {
  @Column({ comment: '文章标题', length: 100 })
  title: string;

  @Column({ comment: '封面图' })
  coverImage: string;

  @Column({ comment: '原创' })
  isOriginal: boolean;

  @Column({ comment: '原文地址', nullable: true })
  originalUrl: string;

  @Column({ comment: '作者', length: 30 })
  author: string;

  @Column({ comment: '文章标签', nullable: true })
  tags: string;

  @Column({ comment: '文章类别' })
  categories: number;

  @Column({ comment: '文章概要', length: 200 })
  outline: string;

  @Column({ comment: '文章详情' })
  content: string;

  @Column({ comment: '阅读数量', nullable: true })
  readingsNumber: number;
}
