import {
  Entity,
  Column as DBColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('option')
@ObjectType({ description: '选项' })
export class Option {
  @Field({ description: 'ID' })
  @PrimaryColumn({ length: 30, comment: '主键' })
  id: string

  @Field({ description: '列ID' })
  @DBColumn({ length: 30, comment: '列ID' })
  columnId: string

  @Field({ description: '名字' })
  @DBColumn({ comment: '名字', default: '' })
  name: string

  @Field({ description: '颜色' })
  @DBColumn({ comment: '颜色', default: '' })
  color: string

  @Field(() => Int, { description: '基于列排序', nullable: true })
  @DBColumn({ comment: '基于列排序' })
  sortBaseColumn: number

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
