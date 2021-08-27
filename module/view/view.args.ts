import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryViewArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class ViewWhereInput {
  @Field({ description: '表格ID' })
  tableId: string
}
