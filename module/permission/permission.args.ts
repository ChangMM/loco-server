import { Field, ArgsType, Int, InputType } from 'type-graphql'
import { IsNumber } from 'class-validator'

@ArgsType()
export class QueryPermissionArgs {
  @Field(() => Int, { description: 'ID' })
  @IsNumber()
  id?: number
}

@InputType({ description: '筛选条件' })
export class PermissionWhereInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id: number
}
