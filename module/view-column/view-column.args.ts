import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryViewColumnArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class ViewColumnWhereInput {
  @Field({ description: '视图ID', nullable: true })
  viewId: string

  @Field({ description: '表格ID', nullable: true })
  tableId: string
}
