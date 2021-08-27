import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'
import { ViewType } from '@shared/enum/view-type.enum'

@Entity('visit')
@ObjectType({ description: '用户访问信息，给前端用的' })
export class Visit {
  @PrimaryGeneratedColumn()
  @Field()
  id: number

  @Field(() => Int, { description: '用户ID' })
  @Column({ comment: '用户ID' })
  userId: number

  @Field({ description: '最近访问的 teamId' })
  @Column({ length: 30, default: '', comment: '最近访问的 teamId' })
  teamId: string

  @Field({ description: '最近访问的 tableId' })
  @Column({ length: 30, default: '', comment: '最近访问的 tableId' })
  tableId: string

  @Field({ description: '最近访问的viewId' })
  @Column({ length: 30, default: '', comment: '最近访问的 viewId' })
  viewId: string

  @Column({ comment: '视图类型', default: '' })
  @Field(() => ViewType, { description: '视图类型' })
  viewType: ViewType

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  // @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  // @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
