import {
  Entity,
  Column as DBColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ObjectType, UseMiddleware } from 'type-graphql'
import { JsonMiddleware } from '@graphql-middleware/json.middleware'
import { FieldType } from '@shared/enum/field-type.enum'
import { TimeFormat } from '@shared/enum/time-format.enum'
import { DateFormat } from '@shared/enum/date-format.enum'

@ObjectType({ description: '列配置' })
class VersionedColumnConfig {
  @Field({ description: '@LongText, 是否开启富文本', nullable: true })
  useRichText: boolean

  @Field({ description: '@Collaborator, 是否可以多个', nullable: true })
  multiCollaborator: boolean

  @Field({ description: '@Collaborator, 是否需要通知', nullable: true })
  shouldNotify: boolean

  @Field(() => DateFormat, { description: '@Date, 日期格式', nullable: true })
  dateFormat: DateFormat

  @Field(() => TimeFormat, { description: '@Date, 时间格式', nullable: true })
  timeFormat: TimeFormat

  @Field({ description: '@Date, 包含时间', nullable: true })
  includeTime: boolean
}

@Entity('versioned_column')
@ObjectType({ description: '列数据' })
export class VersionedColumn {
  @PrimaryGeneratedColumn()
  @Field()
  primaryId: number

  @Field({ description: 'ID' })
  @DBColumn({ length: 30, comment: 'ID' })
  id: string

  @Field({ description: '表格ID' })
  @DBColumn({ length: 30, comment: '表格ID' })
  tableId: string

  @Field({ description: '版本ID' })
  @DBColumn({ comment: '版本ID' })
  versionId: number

  @Field({ description: '名字' })
  @DBColumn({ comment: '名字', default: '' })
  name: string

  @Field({ description: '描述', nullable: true })
  @DBColumn('text', { comment: '描述', nullable: true })
  description: string

  @DBColumn({ comment: '字段类型', default: '' })
  @Field(() => FieldType, { description: '字段类型' })
  fieldType: FieldType

  @Field({ description: '是否是主列', nullable: true })
  @DBColumn({ comment: '是否是主列', default: false })
  isPrimary: boolean

  @Field(() => VersionedColumnConfig, { description: '配置', nullable: true })
  @DBColumn('text', { comment: '配置', nullable: true })
  @UseMiddleware(JsonMiddleware)
  config: any

  @DeleteDateColumn({ comment: '是否已被删除' })
  deletedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date
}
