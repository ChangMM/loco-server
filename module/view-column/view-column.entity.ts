import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('view_column')
@ObjectType({ description: '视图类型-列' })
export class ViewColumn {
  @Field({ description: 'ID' })
  @PrimaryColumn({ length: 30, comment: '主键' })
  id: string

  @Field({ description: '列ID' })
  @Column({ length: 30, comment: '列ID' })
  columnId: string

  @Field({ description: '表格ID' })
  @Column({ length: 30, comment: '表格ID' })
  tableId: string

  @Field({ description: '视图ID' })
  @Column({ length: 30, comment: '视图ID' })
  viewId: string

  @Field(() => Int, { description: '宽度' })
  @Column({ comment: '宽度' })
  width: number

  @Field({ description: '是否可见' })
  @Column({ comment: '是否可见', default: true })
  visible: boolean

  @Field(() => Int, { description: '排序' })
  @Column({ comment: '排序', nullable: true })
  sortBaseView: number

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
