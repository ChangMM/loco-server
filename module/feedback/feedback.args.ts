import { Field, ArgsType, Int, InputType } from 'type-graphql'
import { IsNumber } from 'class-validator'

@ArgsType()
export class QueryFeedbackArgs {
  @Field(() => Int)
  id: number

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

@InputType({ description: '筛选条件' })
export class FeedbackWhereInput {
  @Field(() => Int, { description: 'id', nullable: true })
  @IsNumber()
  id?: number
}
