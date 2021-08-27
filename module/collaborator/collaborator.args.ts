import { Field, ArgsType, Int, InputType } from 'type-graphql'
import { IsNumber } from 'class-validator'

@ArgsType()
export class QueryCollaboratorArgs {
  @Field(() => Int, { description: 'ID' })
  @IsNumber()
  id?: number
}

@InputType({ description: '筛选条件' })
export class CollaboratorWhereInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id: number

  @Field({ description: '表格ID' })
  tableId: string

  @Field(() => Int, { description: '用户ID' })
  userId: number
}
