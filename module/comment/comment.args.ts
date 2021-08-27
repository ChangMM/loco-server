import { Field, ArgsType, Int, InputType } from 'type-graphql'
import { IsNumber } from 'class-validator'
import { CommentStatus } from '@module/comment/comment.entity'

@ArgsType()
export class QueryCommentArgs {
  @Field(() => Int, { description: 'ID', nullable: true })
  @IsNumber()
  id: number
}

@InputType({ description: '筛选条件' })
export class CommentWhereInput {
  @Field(() => Int, { description: '用户ID', nullable: true })
  @IsNumber()
  id?: number

  @Field(() => CommentStatus, { description: '状态', nullable: true })
  status?: string

  @Field(() => Int, { description: '用户id', nullable: true })
  userId?: number

  @Field(() => [CommentStatus], { description: '在状态中筛选', nullable: true })
  status_in?: CommentStatus[]

  @Field(() => Int, { description: '根评论id', nullable: true })
  rootId: number
}
