import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('version')
@ObjectType({ description: '版本' })
export class Version {
  @PrimaryGeneratedColumn()
  @Field()
  id: number

  @Field({ description: '表格ID' })
  @Column({ length: 30, comment: '表格ID' })
  tableId: string

  @Field({ description: '名字' })
  @Column({ comment: '名字', default: '' })
  name: string

  @Field({ description: '描述', nullable: true })
  @Column('text', { comment: '描述', nullable: true })
  description: string

  @Field(() => Int, { description: '索引ID' })
  @Column({ comment: '索引ID', nullable: true })
  index: number

  @Field(() => Int, { description: '排序' })
  @Column({ comment: '排序', nullable: true })
  sortBaseTable: number

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
