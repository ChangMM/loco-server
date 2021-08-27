import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ObjectType, UseMiddleware } from 'type-graphql'
import { FieldType } from '@shared/enum/field-type.enum'
// import { VersionedOption } from '../versioned-option/versioned-option.entity'
import { GraphQLCellData } from '@shared/scalars/cell-data'
import { CellDataMiddleware } from '@graphql-middleware/cell-data.middleware'

@Entity('versioned_cell')
@ObjectType({ description: '一个单元格' })
export class VersionedCell {
  @PrimaryGeneratedColumn()
  @Field()
  primaryId: number

  @Field({ description: 'ID' })
  @Column({ length: 30, comment: 'ID' })
  id: string

  @Field({ description: '表格ID' })
  @Column({ length: 30, comment: '表格ID' })
  tableId: string

  @Field({ description: '列ID' })
  @Column({ length: 30, comment: '列ID' })
  columnId: string

  @Field({ description: '行ID' })
  @Column({ length: 30, comment: '行ID' })
  rowId: string

  @Field({ description: '版本ID' })
  @Column({ comment: '版本ID' })
  versionId: number

  @Column({ comment: '字段类型', default: '' })
  @Field(() => FieldType, { description: '字段类型' })
  fieldType: FieldType

  @Field(() => GraphQLCellData, { description: '单元格数据', nullable: true })
  @Column('varchar', { comment: '单元格数据', nullable: true })
  @UseMiddleware(CellDataMiddleware)
  data: any

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date

  // @Field(() => [Option], { description: '该单元格的选项', defaultValue: [] })
  // options: VersionedOption[]
}
