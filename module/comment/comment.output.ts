import { Field, Int, ObjectType } from 'type-graphql'
import { Comment } from '@module/comment/comment.entity'
@ObjectType()
export class CommentOutPut {
  @Field(() => Int, { description: 'id', nullable: true })
  id: number

  @Field(() => Int, { description: '剧本id', nullable: true })
  scriptId: number

  @Field(() => Int, { description: '用户id', nullable: true })
  userId: number

  @Field(() => Int, { description: '父级id', nullable: true })
  parentId: number

  @Field({ description: '内容', nullable: true })
  content: string

  @Field(() => Int, { description: '分数', nullable: true })
  rate: number

  @Field(() => Int, { description: '评分打星', nullable: true })
  starCount: number
}

@ObjectType({ description: 'connection' })
export class CommentInfosConnection {
  @Field(() => [Comment])
  items: Comment[]
  @Field(() => Int)
  totalCount: number
  @Field(() => Boolean)
  hasNextPage: boolean
}

@ObjectType({ description: 'connection' })
export class CommentStatusCount {
  @Field(() => Int)
  num: number
  @Field()
  status: string
}
