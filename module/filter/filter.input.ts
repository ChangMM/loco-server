import { ConjunctionType } from '@shared/enum/conjunction-type.enum'
import { FieldType } from '@shared/enum/field-type.enum'
import { OperatorType } from '@shared/enum/operator-type.enum'
import { Field, InputType } from 'type-graphql'

@InputType()
export class FilterInput {
  @Field({ description: '列ID' })
  columnId: string

  @Field({ description: '表格ID' })
  tableId: string

  @Field({ description: '视图ID' })
  viewId: string
}

@InputType({ description: '创建筛选' })
export class CreateFilterInput {
  @Field({ description: 'ID' })
  id: string

  @Field({ description: '列ID' })
  columnId: string

  @Field({ description: '表格ID' })
  tableId: string

  @Field({ description: '视图ID' })
  viewId: string

  @Field(() => ConjunctionType, { description: '筛选连接类型' })
  conjunction: ConjunctionType

  @Field(() => OperatorType, { description: '操作类型' })
  operator: OperatorType

  @Field(() => FieldType, { description: '字段类型' })
  fieldType: FieldType
}

@InputType({ description: '更新条件' })
export class UpdateFilterWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateFilterDataInput {
  @Field({ description: '列ID', nullable: true })
  columnId: string

  @Field(() => ConjunctionType, { description: '筛选连接类型', nullable: true })
  conjunction: ConjunctionType

  @Field(() => OperatorType, { description: '操作类型', nullable: true })
  operator: OperatorType

  @Field(() => FieldType, { description: '字段类型', nullable: true })
  fieldType: FieldType
}

@InputType({ description: '删除' })
export class DeleteFilterInput {
  @Field({ description: 'ID' })
  id: string
}
