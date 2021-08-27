import { Field, ArgsType, Int, InputType } from 'type-graphql'

@ArgsType()
export class QueryMemberArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class MemberWhereInput {
  @Field({ description: '团队', nullable: true })
  teamId: string

  @Field(() => Int, { description: '用户ID', nullable: true })
  userId: number
}
