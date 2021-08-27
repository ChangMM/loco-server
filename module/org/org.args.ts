import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryOrgArgs {
  @Field({ description: 'ID', nullable: true })
  id: string
}

@InputType({ description: '筛选条件' })
export class OrgWhereInput {
  @Field({ description: 'ID' })
  id: string
}
