import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryFilterArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class FilterWhereInput {
  @Field({ description: '视图ID' })
  viewId: string
}
