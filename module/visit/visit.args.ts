import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryVisitArgs {
  @Field({ description: 'ID' })
  id: number
}

@InputType({ description: '筛选条件' })
export class VisitWhereInput {
  @Field({ description: '表格ID', nullable: true })
  tableId: string
}
