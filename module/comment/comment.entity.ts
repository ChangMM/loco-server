import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Field, ObjectType, Int, registerEnumType } from 'type-graphql'
import { User } from '../user/user.entity'

export enum CommentStatus {
  isNull = 'isNull', // 默认状态, 未审核
  notAudited = 'notAudited', // 未审核
  auditSuccess = 'auditSuccess', // 审核通过
  auditFail = 'auditFail', // 审核不通过
  nonsense = 'nonsense', // 无意义
}

registerEnumType(CommentStatus, {
  name: 'CommentStatus',
  description: '评论状态',
})

@Entity('comment')
@ObjectType({ description: '评论表' })
export class Comment {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => Int, { description: '用户id', nullable: true })
  @Column({ comment: '用户id' })
  userId: number

  @Field(() => Int, { description: '根评论id', nullable: true })
  @Column({ comment: '根评论id', nullable: true })
  rootId: number

  @Field(() => Int, { description: '父级id', nullable: true })
  @Column({ comment: '父级id' })
  parentId: number

  @Field({ description: '内容', nullable: true })
  @Column({ comment: '内容', nullable: true })
  content: string

  @Field({ description: '备注', nullable: true })
  @Column({ comment: '备注', nullable: true })
  remark: string

  @Field(() => CommentStatus, { description: '状态', nullable: true })
  @Column({ comment: '状态', nullable: true })
  status: string

  @Field(() => Int, { description: '点赞数', nullable: true })
  @Column({ comment: '点赞数', nullable: true })
  likeCount: number

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

  @Field(() => User, { nullable: true })
  user: User

  @Field(() => Comment, { nullable: true })
  parentComment: Comment
}
