import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('table')
@ObjectType({ description: '一张表格' })
export class Table {
  @Field({ description: 'ID' })
  @PrimaryColumn({ length: 30, comment: '主键' })
  id: string

  @Field({ description: '团队ID' })
  @Column({ length: 30, comment: '团队ID' })
  teamId: string

  @Field(() => Int, { description: '用户ID' })
  @Column({ comment: '用户ID' })
  creatorId: number

  @Field({ description: '最近访问的viewId' })
  @Column({ length: 30, default: '', comment: '最近访问的 viewId' })
  lastVisitedViewId: string

  @Field({ description: '名字' })
  @Column({ comment: '名字', default: '' })
  name: string

  @Field({ description: '描述', nullable: true })
  @Column('text', { comment: '描述', nullable: true })
  description: string

  @Field({ description: '对外权限,private/public', nullable: true })
  @Column({ comment: '对外权限', nullable: true })
  permissionLevel: string

  @Field(() => Int, { description: '基于Team排序', nullable: true })
  @Column({ comment: '基于Team排序', nullable: true })
  sortBaseTeam: number

  @Field({ description: '是否在编辑中, 给前端用用的', defaultValue: false })
  editing: boolean

  @DeleteDateColumn({ comment: '是否已被删除' })
  @Field({ nullable: true })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
