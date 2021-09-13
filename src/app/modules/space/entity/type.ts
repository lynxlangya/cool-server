import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from 'midwayjs-cool-core';
import { Column } from 'typeorm';

/**
 * 图片空间信息分类
 */
@EntityModel('base_app_space_type')
export class BaseAppSpaceTypeEntity extends BaseEntity {
  @Column({ comment: '类别名称' })
  name: string;

  @Column({ comment: '父分类ID', type: 'tinyint', nullable: true })
  parentId: number;
}
