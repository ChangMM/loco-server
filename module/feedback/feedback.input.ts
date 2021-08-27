import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class FeedbackInput {
  @Field(() => Int, { description: 'id', nullable: true })
  userId: number

  @Field({ description: '标题' })
  title: string

  @Field({ description: '反馈内容', nullable: true })
  content: string

  @Field({ description: '联系方式' })
  contact: string

  @Field({ description: '图片,多url用逗号分隔,eg：url1,url2,url3', nullable: true })
  images: string
}

@InputType({ description: '创建' })
export class CreateFeedbackInput extends FeedbackInput {}

@InputType({ description: '更新条件' })
export class UpdateFeedbackWhereInput extends FeedbackInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id?: number
}

@InputType({ description: '更新data' })
export class UpdateFeedbackDataInput extends FeedbackInput {}

@InputType({ description: '删除' })
export class DeleteFeedbackInput extends FeedbackInput {
  @Field(() => Int, { description: 'id', nullable: true })
  id: number
}
