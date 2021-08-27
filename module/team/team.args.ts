import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryTeamArgs {
  @Field({ description: 'ID', nullable: true })
  id: string

  @Field({ description: '短网址', nullable: true })
  slug: string
}

@InputType({ description: '筛选条件' })
export class TeamWhereInput {
  @Field({ description: 'ID' })
  id: string
}
