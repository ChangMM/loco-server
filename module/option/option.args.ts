import { Field, ArgsType, Int, InputType } from 'type-graphql'
import { IsNumber } from 'class-validator'

@ArgsType()
export class QueryOptionArgs {
  @Field({ description: '列ID' })
  columnId: string
}

@InputType({ description: '筛选条件' })
export class OptionWhereInput {
  @Field(() => Int, { description: 'id', nullable: true })
  @IsNumber()
  id?: number
}
