import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('org_user')
@ObjectType({ description: '组织用户表' })
export class OrgUser {
  @Field({ description: 'ID' })
  @PrimaryColumn({ length: 30, comment: '主键' })
  id: string

  @Field({ description: '团队ID' })
  @Column({ comment: '团队ID' })
  orgId: string

  @Field(() => Int, { description: '用户ID' })
  @Column({ comment: '用户ID' })
  userId: number

  @Column({ comment: '账户类型', default: '' })
  @Field({ description: '账户类型' })
  accountType: string

  @Column({ comment: '账户类型变化时间', nullable: true })
  @Field({ description: '账户类型变化时间', nullable: true })
  accountTypeChangedAt: Date

  @Column({ comment: '账户权限，admin,member,readonly...', default: '' })
  @Field({ description: '账户权限，admin,member,readonly...' })
  permission: string

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
