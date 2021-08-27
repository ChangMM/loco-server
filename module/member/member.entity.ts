import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('member')
@ObjectType({ description: '成员' })
export class Member {
  @Field({ description: 'ID' })
  @PrimaryColumn({ length: 30, comment: '主键' })
  id: string

  @Field({ description: '团队ID' })
  @Column({ comment: '团队ID' })
  teamId: string

  @Field(() => Int, { description: '用户ID' })
  @Column({ comment: '用户ID' })
  userId: number

  @Field(() => Int, { description: '角色ID' })
  @Column({ comment: '角色ID' })
  roleId: number

  @Column({ comment: '在团队中显示的昵称', default: '' })
  @Field({ description: '在团队中显示的昵称' })
  nickname: string

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
