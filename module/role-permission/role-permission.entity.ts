import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('role_permission')
@ObjectType({ description: '角色权限表' })
export class RolePermission {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => Int, { description: '权限ID', nullable: true })
  @Column({ comment: '权限ID', nullable: true })
  permissionId: number

  @Field(() => Int, { description: '角色ID', nullable: true })
  @Column({ comment: '角色ID', nullable: true })
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
