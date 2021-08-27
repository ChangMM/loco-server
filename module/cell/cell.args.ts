import { Field, ArgsType, InputType } from 'type-graphql'
import { FieldType } from '@shared/enum/field-type.enum'

@ArgsType()
export class QueryCellArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class CellWhereInput {
  @Field({ description: '列ID' })
  columnId: string

  @Field({ description: '行ID', nullable: true })
  rowId: string

  @Field(() => FieldType, { description: '字段类型', nullable: true })
  fieldType: FieldType
}
