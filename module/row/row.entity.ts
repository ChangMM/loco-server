import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('row')
@ObjectType({ description: '行数据' })
export class Row {
  @Field({ description: 'ID' })
  @PrimaryColumn({ length: 30, comment: '主键' })
  id: string

  @Field({ description: '表格ID' })
  @Column({ length: 30, comment: '表格ID' })
  tableId: string

  @Field(() => Int, { description: '排序' })
  @Column({ comment: '排序', nullable: true })
  sortBaseTable: number

  @Field({ description: '是否disabled' })
  @Column({ comment: '是否disabled', default: false })
  disabled: boolean

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
