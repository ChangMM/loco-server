import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'
import { ConjunctionType } from '@shared/enum/conjunction-type.enum'
import { OperatorType } from '@shared/enum/operator-type.enum'
import { FieldType } from '@shared/enum/field-type.enum'

@Entity('filter')
@ObjectType({ description: '筛选' })
export class Filter {
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

  @Column({ comment: '筛选连接类型', default: 'Or' })
  @Field(() => ConjunctionType, { description: '筛选连接类型' })
  conjunction: ConjunctionType

  @Column({ comment: '操作类型', default: '' })
  @Field(() => OperatorType, { description: '操作类型' })
  operator: OperatorType

  @Column({ comment: '字段类型', default: '' })
  @Field(() => FieldType, { description: '字段类型' })
  fieldType: FieldType

  @Column({ comment: '值', default: '' })
  @Field({ description: '值' })
  value: string

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
