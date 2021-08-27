import { Field, ArgsType, Int, InputType } from 'type-graphql'

@ArgsType()
export class QueryOrgUserArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class OrgUserWhereInput {
  @Field(() => Int, { description: '用户ID' })
  userId: number
}
