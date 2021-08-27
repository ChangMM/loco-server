import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('team')
@ObjectType({ description: '团队' })
export class Team {
  @Field({ description: 'ID' })
  @PrimaryColumn({ length: 30, comment: '主键' })
  id: string

  @Field(() => Int, { description: '创建者用户ID' })
  @Column({ comment: '创建者用户ID' })
  creatorId: number

  @Field(() => Int, { description: '所有者ID' })
  @Column({ comment: '所有者ID' })
  ownerId: number

  @Field(() => Int, { description: '删除者Id', nullable: true })
  @Column({ comment: '删除者Id', nullable: true })
  deletedById: number

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

  @Field({ description: '访问类型, public,private...' })
  @Column({ comment: '访问类型, public,private...', default: '' })
  access: string

  @Column('boolean', { comment: '是否是个人的', default: 0 })
  @Field({ description: '是否是个人的' })
  isPersonal: boolean

  @Column('boolean', { comment: '', default: 0 })
  @Field({ description: '' })
  isPaid: boolean

  @Column('boolean', { comment: '', default: 0 })
  @Field({ description: '' })
  isStudentTeam: boolean

  @Field(() => Int, { description: 'table数量' })
  @Column({ comment: 'table', default: 0 })
  tableCount: number

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
