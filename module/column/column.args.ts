import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryColumnArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class ColumnWhereInput {
  @Field({ description: '表格ID' })
  tableId: string
}
