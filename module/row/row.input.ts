import { CellWithDataInput, ModifyCellInput } from '@module/cell/cell.input'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class RowInput {
  @Field({ description: '表格ID' })
  tableId: string

  @Field(() => Int, { description: '排序', nullable: true })
  sortBaseTable: number
}

@InputType({ description: '创建' })
export class CreateRowInput extends RowInput {}

@InputType({ description: '更新条件' })
export class UpdateRowWhereInput {
  @Field({ description: 'ID', nullable: true })
  id?: string
}

@InputType({ description: '更新data' })
export class UpdateRowDataInput extends RowInput {}

@InputType({ description: '删除' })
export class DeleteRowInput extends RowInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '创建Table行' })
export class AddRowInput {
  @Field({ description: 'ID' })
  id: string

  @Field({ description: '表格ID' })
  tableId: string
}

@InputType({ description: '添加一行 with data' })
export class AddRowWithDataInput {
  @Field({ description: '表格ID' })
  tableId: string

  @Field(() => [CellWithDataInput], { description: '单元格数据' })
  cells: CellWithDataInput[]
}

@InputType({ description: '修改行数据' })
export class ModifyRowInput {
  @Field(() => [ModifyCellInput], { description: '单元格数据' })
  cells: ModifyCellInput[]
}

@InputType({ description: '删除Table行' })
export class RemoveRowInput {
  @Field({ description: 'ID' })
  id: string
}
