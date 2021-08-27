import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'
import { User } from '../user/user.entity'

@Entity('feedback')
@ObjectType({ description: '反馈' })
export class Feedback {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => Int, { description: 'id', nullable: true })
  @Column({ comment: '用户id' })
  userId: number

  @Field({ description: '标题' })
  @Column({ comment: '标题', default: '' })
  title: string

  @Field({ description: '反馈内容', nullable: true })
  @Column('text', { comment: '反馈内容', nullable: true })
  content: string

  @Field({ description: '联系方式' })
  @Column({ comment: '联系方式', default: '' })
  contact: string

  @Field({ description: '图片,多url用逗号分隔,eg：url1,url2,url3', nullable: true })
  @Column({ comment: '图片,多url用逗号分隔,eg：url1,url2,url3', nullable: true })
  images: string

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date

  @Field(() => User)
  user: User
}
