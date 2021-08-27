import { Field, ArgsType, Int, InputType } from 'type-graphql'
import { IsNumber } from 'class-validator'

@ArgsType()
export class QueryUserArgs {
  @Field(() => Int, { description: 'ID', nullable: true })
  @IsNumber()
  id?: number

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  nickname?: string
}

@InputType({ description: '筛选条件' })
export class UserWhereInput {
  @Field({ description: '昵称', nullable: true })
  nickname: string

  @Field({ description: '搜索用户', nullable: true })
  q: string
}
