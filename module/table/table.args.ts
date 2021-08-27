import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryTableArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class TableWhereInput {
  @Field({ description: '团队ID', nullable: true })
  teamId: string
}
