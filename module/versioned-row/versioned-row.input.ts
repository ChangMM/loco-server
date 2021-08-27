import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class VersionedRowInput {
  @Field({ description: '表格ID' })
  tableId: string

  @Field(() => Int, { description: '排序', nullable: true })
  sortBaseTable: number
}

@InputType({ description: '创建' })
export class CreateVersionedRowInput extends VersionedRowInput {}

@InputType({ description: '更新条件' })
export class UpdateVersionedRowWhereInput {
  @Field({ description: 'ID', nullable: true })
  id?: string
}

@InputType({ description: '更新data' })
export class UpdateVersionedRowDataInput extends VersionedRowInput {}

@InputType({ description: '删除' })
export class DeleteVersionedRowInput extends VersionedRowInput {
  @Field({ description: 'ID' })
  id: string
}
