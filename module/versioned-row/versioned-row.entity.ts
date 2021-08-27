import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'

@Entity('versioned_row')
@ObjectType({ description: '行数据' })
export class VersionedRow {
  @PrimaryGeneratedColumn()
  @Field()
  primaryId: number

  @Field({ description: 'ID' })
  @Column({ length: 30, comment: 'ID' })
  id: string

  @Field({ description: '表格ID' })
  @Column({ length: 30, comment: '表格ID' })
  tableId: string

  @Field({ description: '版本ID' })
  @Column({ comment: '版本ID' })
  versionId: number

  @Field(() => Int, { description: '排序' })
  @Column({ comment: '排序', nullable: true })
  sortBaseTable: number

  @Field({ description: '是否disabled' })
  @Column({ comment: '是否disabled', default: false })
  disabled: boolean

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
