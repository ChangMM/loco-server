import { Field, ArgsType, Int, InputType } from 'type-graphql'
import { IsNumber } from 'class-validator'

@ArgsType()
export class QueryVersionedOptionArgs {
  @Field({ description: '列ID' })
  versionedColumnId: string
}

@InputType({ description: '筛选条件' })
export class VersionedOptionWhereInput {
  @Field(() => Int, { description: 'id', nullable: true })
  @IsNumber()
  id?: number
}
