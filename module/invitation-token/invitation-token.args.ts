import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryInvitationTokenArgs {
  @Field({ description: 'ID' })
  id: number
}

@InputType({ description: '筛选条件' })
export class InvitationTokenWhereInput {
  @Field({ description: '团队' })
  teamId: string
}
