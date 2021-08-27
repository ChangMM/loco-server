import { FieldType } from '@shared/enum/field-type.enum'
import { Field, InputType } from 'type-graphql'

@InputType()
export class VersionedInput {
  @Field({ description: '列ID' })
  columnId: string

  @Field({ description: '行ID' })
  rowId: string

  @Field(() => FieldType, { description: '字段类型' })
  fieldType: FieldType

  @Field({ description: '单元格数据', nullable: true })
  data: string
}

@InputType({ description: '创建' })
export class CreateVersionedCellInput extends VersionedInput {}

@InputType({ description: '更新条件' })
export class UpdateVersionedCellWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateVersionedCellDataInput {
  @Field(() => String, { description: '列ID' })
  @Field({ description: '单元格数据', nullable: true })
  data: string
}

@InputType({ description: '删除' })
export class DeleteVersionedCellInput {
  @Field({ description: 'ID' })
  id: string
}
