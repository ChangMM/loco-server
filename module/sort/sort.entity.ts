import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('sort')
@ObjectType({ description: '排序' })
export class Sort {
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

  @Field({ description: '是否升序' })
  @Column({ comment: '是否升序', default: true })
  ascending: boolean

  @Field(() => Int, { description: '排序', nullable: true })
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
