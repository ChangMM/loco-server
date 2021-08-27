import { FieldType } from '@shared/enum/field-type.enum'
import { GraphQLCellData } from '@shared/scalars/cell-data'
import { CellDataMiddleware } from '@graphql-middleware/cell-data.middleware'
import { Field, InputType, UseMiddleware } from 'type-graphql'

@InputType()
export class CellInput {
  @Field({ description: '列ID' })
  columnId: string

  @Field({ description: '行ID' })
  rowId: string

  @Field(() => FieldType, { description: '字段类型' })
  fieldType: FieldType

  @Field({ description: '单元格数据', nullable: true })
  data: string
}

@InputType({ description: '创建' })
export class CreateCellInput extends CellInput {}

@InputType({ description: '更新条件' })
export class UpdateCellWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateCellDataInput {
  @Field(() => String, { description: '列ID' })
  @Field({ description: '单元格数据', nullable: true })
  data: string
}

@InputType({ description: '删除' })
export class DeleteCellInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新Cell' })
export class ModifyCellInput {
  @Field({ description: '列ID' })
  columnId: string

  @Field({ description: '行ID' })
  rowId: string

  @Field(() => GraphQLCellData, { description: '单元格数据', nullable: true })
  @UseMiddleware(CellDataMiddleware)
  data: any
}

@InputType({ description: '新增Cell' })
export class CellWithDataInput {
  @Field({ description: '列ID' })
  columnId: string

  @Field(() => FieldType, { description: '字段类型' })
  fieldType: FieldType

  @Field(() => GraphQLCellData, { description: '单元格数据', nullable: true })
  @UseMiddleware(CellDataMiddleware)
  data: any
}
