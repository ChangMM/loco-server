import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('collaborator')
@ObjectType({ description: '表格协作者' })
export class Collaborator {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ description: '表格ID' })
  @Column({ length: 30, comment: '表格ID' })
  tableId: string

  @Field(() => Int, { description: '用户ID' })
  @Column({ comment: '用户ID' })
  userId: number

  @Field(() => Int, { description: '角色ID' })
  @Column({ comment: '角色ID' })
  roleId: number

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
