import {
  Entity,
  Column as DBColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('versioned_option')
@ObjectType({ description: '选项' })
export class VersionedOption {
  @PrimaryGeneratedColumn()
  @Field()
  primaryId: number

  @Field({ description: 'ID' })
  @DBColumn({ length: 30, comment: 'ID' })
  id: string

  @Field({ description: '列ID' })
  @DBColumn({ length: 30, comment: '列ID' })
  versionedColumnId: string

  @Field({ description: '名字' })
  @DBColumn({ comment: '名字', default: '' })
  name: string

  @Field({ description: '颜色' })
  @DBColumn({ comment: '颜色', default: '' })
  color: string

  @Field(() => Int, { description: '基于列排序', nullable: true })
  @DBColumn({ comment: '基于列排序' })
  sortBaseVersionedColumn: number

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
