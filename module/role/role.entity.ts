/**
 * 管理员，项目维护者，团队主管，语言协调员，复核者，翻译员
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'
import { RoleType } from '@shared/enum/role-type.enum'

@Entity('role')
@ObjectType({ description: '权限角色表' })
export class Role {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => RoleType, { description: '角色名' })
  @Column({ comment: '角色名', default: '' })
  name: RoleType

  @Field({ description: '中文名' })
  @Column({ comment: '中文名', default: '' })
  alias: string

  @Field({ description: '描述' })
  @Column({ comment: '描述', default: '' })
  desc: string

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
