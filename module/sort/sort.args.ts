import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QuerySortArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class SortWhereInput {
  @Field({ description: '视图ID' })
  viewId: string
}
