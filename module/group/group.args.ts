import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryGroupArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class GroupWhereInput {
  @Field({ description: '视图ID' })
  viewId: string
}
