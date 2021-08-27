import { DateFormat } from '@shared/enum/date-format.enum'
import { FieldType } from '@shared/enum/field-type.enum'
import { TimeFormat } from '@shared/enum/time-format.enum'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class ColumnInput {
  @Field({ description: '名字' })
  name: string

  @Field(() => FieldType, { description: '字段类型' })
  fieldType: FieldType

  @Field({ description: '是否是主列', nullable: true })
  isPrimary: true

  @Field({ description: '是否可见', nullable: true })
  visible: true

  @Field({ description: '描述', nullable: true })
  description: string

  @Field(() => Int, { description: '排序', nullable: true })
  sort: number
}

@InputType({ description: '创建' })
export class CreateColumnInput extends ColumnInput {}

@InputType({ description: '更新条件' })
export class UpdateColumnWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateColumnDataInput {
  @Field(() => FieldType, { description: '字段类型', nullable: true })
  fieldType: FieldType

  @Field({ description: '名字', nullable: true })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string
}

@InputType({ description: '删除' })
export class DeleteColumnInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '创建Table列' })
export class AddColumnInput {
  @Field({ description: 'ID' })
  id: string

  @Field({ description: '表格ID' })
  tableId: string

  @Field(() => FieldType, { description: '字段类型' })
  fieldType: FieldType

  @Field({ description: '列的名字' })
  name: string

  @Field(() => ColumnConfigInput, { description: '配置', nullable: true })
  config: any
}

@InputType({ description: '删除列' })
export class RemoveColumnInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '列配置' })
export class ColumnConfigInput {
  @Field({ description: '@LongText, 是否开启富文本', nullable: true })
  useRichText: boolean

  @Field({ description: '@Collaborator, 是否可以多个', nullable: true })
  multiCollaborator: boolean

  @Field({ description: '@Collaborator, 是否需要通知', nullable: true })
  shouldNotify: boolean

  @Field(() => DateFormat, { description: '@Date, 日期格式', nullable: true })
  dateFormat: DateFormat

  @Field(() => TimeFormat, { description: '@Date, 时间格式', nullable: true })
  timeFormat: TimeFormat

  @Field({ description: '@Date, 包含时间', nullable: true })
  includeTime: boolean
}

@InputType({ description: '修改列' })
export class ModifyColumnInput {
  @Field({ description: 'ID' })
  id: string

  @Field(() => FieldType, { description: '字段类型', nullable: true })
  fieldType: FieldType

  @Field({ description: '列的名字', nullable: true })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string

  @Field(() => ColumnConfigInput, { description: '配置', nullable: true })
  config: any
}
