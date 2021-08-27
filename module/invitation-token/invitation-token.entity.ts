import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { RoleType } from '@shared/enum/role-type.enum'

@Entity('invitation-token')
@ObjectType({ description: '邀请链接Token' })
export class InvitationToken {
  @PrimaryGeneratedColumn()
  @Field({ description: 'ID' })
  id: number

  @Field({ description: '团队ID' })
  @Column({ comment: '团队ID' })
  teamId: string

  @Field(() => RoleType, { description: '角色类型' })
  @Column({ comment: '角色类型', default: '' })
  roleType: RoleType

  @Field({ description: 'token' })
  @Column({ comment: 'token', default: '' })
  token: string

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
