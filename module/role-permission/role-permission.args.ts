import { Field, ArgsType, Int, InputType } from 'type-graphql'
import { IsNumber } from 'class-validator'

@ArgsType()
export class QueryRolePermissionArgs {
  @Field(() => Int, { description: 'ID' })
  @IsNumber()
  id?: number
}

@InputType({ description: '筛选条件' })
export class RolePermissionWhereInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id: number
}
