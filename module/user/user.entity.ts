import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'user' })
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number

  @Column({ comment: '唯一标识', default: '' })
  @Field({ description: '唯一标识' })
  login: string

  @Column({ comment: 'Github ID', default: null })
  @Field({ description: 'Github ID', nullable: true })
  githubId: number

  @Column({ comment: '用户名', default: '' })
  @Field({ description: '用户名' })
  username: string

  @Column({ comment: '全名/昵称', default: '' })
  @Field({ description: '全名/昵称' })
  nickname: string

  @Column({ length: 400, comment: '个人简介', default: '' })
  @Field({ description: '个人简介' })
  bio: string

  @Column({ comment: '头像', default: '' })
  @Field({ description: '头像' })
  avatar: string

  @Column({ comment: '邮箱', default: '' })
  @Field({ description: '邮箱' })
  email: string

  @Column({ comment: '邮箱校验时间', nullable: true })
  @Field({ description: '邮箱校验时间', nullable: true })
  emailValidatedAt: Date

  @Column({ comment: '手机', default: '' })
  @Field({ description: '手机' })
  phone: string

  @Column({ comment: '职业', default: '' })
  @Field({ description: '职业' })
  jobTitle: string

  @Column({ comment: '密码', default: '' })
  password: string

  @Column('boolean', { comment: '', default: 0 })
  @Field({ description: '' })
  googleSsoOnly: boolean

  @Column('boolean', { comment: '', default: 0 })
  @Field({ description: '' })
  samlSsoOnly: boolean

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
