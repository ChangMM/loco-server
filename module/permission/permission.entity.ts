import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'
import { Action } from '@shared/enum/action.enum'

@Entity('permission')
@ObjectType({ description: '权限表' })
export class Permission {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ description: '权限名称', nullable: true })
  @Column({ comment: '权限名称' })
  name: string

  @Field({ description: '权限码', nullable: true })
  @Column({ comment: '权限码' })
  code: string

  @Field({ description: '权限描述', nullable: true })
  @Column({ comment: '权限描述' })
  desc: string

  @Field(() => Action, { description: '权限操作类型', nullable: true })
  @Column({ comment: '权限操作类型' })
  action: Action

  @Field({ description: '主题', nullable: true })
  @Column({ comment: '主题', default: '' })
  subject: string

  @Field({ description: '条件', nullable: true })
  @Column({ comment: '条件' })
  conditions: string

  @Field({ description: '属性', nullable: true })
  @Column({ comment: '属性' })
  fields: string

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
