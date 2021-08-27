import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('org')
@ObjectType({ description: '组织' })
export class Org {
  @Field({ description: 'ID' })
  @PrimaryColumn({ length: 30, comment: '主键' })
  id: string

  @Field(() => Int, { description: '创建者用户ID' })
  @Column({ comment: '创建者用户ID' })
  creatorId: number

  @Field(() => Int, { description: '所有者ID' })
  @Column({ comment: '所有者ID' })
  ownerId: number

  @Field({ description: '短网址' })
  @Column({ comment: '短网址', default: '' })
  slug: string

  @Field({ description: '名字' })
  @Column({ comment: '名字', default: '' })
  name: string

  @Field({ description: '描述', nullable: true })
  @Column('text', { comment: '描述', nullable: true })
  description: string

  @Field({ description: '头像' })
  @Column({ comment: '头像', default: '' })
  avatar: string

  @Field({ description: 'quarterly, year...' })
  @Column({ comment: 'quarterly, year...', default: '' })
  billing: string

  @Column('boolean', { comment: '', default: 0 })
  @Field({ description: '' })
  googleSsoOnly: boolean

  @Column('boolean', { comment: '', default: 0 })
  @Field({ description: '' })
  samlSsoOnly: boolean

  @Column({ comment: '逾期时间', nullable: true })
  @Field({ description: '逾期时间', nullable: true })
  accountTypeChangedAt: Date

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
