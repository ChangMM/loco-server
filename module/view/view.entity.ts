import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'
import { ViewType } from '@shared/enum/view-type.enum'
import { LeadingType } from '@shared/enum/leading-type.enum'

@Entity('view')
@ObjectType({ description: '视图类型' })
export class View {
  @Field({ description: 'ID' })
  @PrimaryColumn({ length: 30, comment: '主键' })
  id: string

  @Field({ description: '表格ID' })
  @Column({ length: 30, comment: '表格ID' })
  tableId: string

  @Field({ description: '名字' })
  @Column({ comment: '名字', default: '' })
  name: string

  @Field({ description: '描述', nullable: true })
  @Column('text', { comment: '描述', nullable: true })
  description: string

  @Column('boolean', { comment: '是否公开给成员', default: 0 })
  @Field({ description: '是否公开给成员' })
  public: boolean

  @Column({ comment: '类型', default: '' })
  @Field(() => ViewType, { description: '类型' })
  type: ViewType

  @Field({ description: '看板基准列', nullable: true })
  @Column({ length: 30, comment: '看板基准列', nullable: true })
  stackedColumnId: string

  @Field(() => LeadingType, { description: '行距' })
  @Column({ comment: '行距', default: LeadingType.Short })
  leading: LeadingType

  @Field(() => Int, { description: '排序', nullable: true })
  @Column({ comment: '排序', nullable: true })
  sortBaseTable: number

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
