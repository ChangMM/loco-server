import { Field, InputType, Int } from 'type-graphql'
import { CommentStatus } from '@module/comment/comment.entity'

@InputType()
export class CommentInput {
  @Field(() => Int, { description: '剧本id', nullable: true })
  scriptId: number

  @Field(() => Int, { description: '用户id', nullable: true })
  userId: number

  @Field(() => Int, { description: '父级id', nullable: true })
  parentId: number

  @Field(() => Int, { description: '根评论id', nullable: true })
  rootId: number

  @Field({ description: '内容', nullable: true })
  content: string
}

@InputType({ description: '创建' })
export class CreateCommentInput extends CommentInput {
  @Field({ description: '图片,多url用逗号分隔,eg：url1,url2,url3', nullable: true })
  images?: string
}

@InputType({ description: '更新条件' })
export class UpdateCommentWhereInput extends CommentInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id: number
}

@InputType({ description: '更新data' })
export class UpdateCommentDataInput extends CommentInput {
  @Field({ description: '是否剧透', nullable: true })
  leaked: boolean

  @Field(() => CommentStatus, { description: '状态', nullable: true })
  status: string

  @Field(() => String, { description: '备注', nullable: true })
  remark: string
}

@InputType({ description: '删除' })
export class DeleteCommentInput extends CommentInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id: number
}

@InputType({ description: '点赞' })
export class StarCommentInput {
  @Field(() => Int, { description: 'ID' })
  id: number

  @Field(() => Int, { description: '用户id' })
  userId: number

  @Field(() => Int, { description: '剧本id', nullable: true })
  scriptId: number
}

@InputType({ description: '点赞' })
export class UnstarCommentInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id: number

  @Field(() => Int, { description: '用户id' })
  userId: number
}
