import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class ViewColumnInput {
  @Field({ description: '列ID', nullable: true })
  columnId: string

  @Field({ description: '表格ID' })
  tableId: string

  @Field({ description: '视图ID' })
  viewId: string

  @Field(() => Int, { description: '宽度', nullable: true })
  width: number

  @Field({ description: '是否可见', nullable: true })
  visible: boolean
}

@InputType({ description: '创建' })
export class CreateViewColumnInput extends ViewColumnInput {}

@InputType({ description: '更新条件' })
export class UpdateViewColumnWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateViewColumnDataInput {
  @Field(() => Int, { description: '宽度', nullable: true })
  width: number

  @Field({ description: '是否可见', nullable: true })
  visible: boolean
}

@InputType({ description: '删除' })
export class DeleteViewColumnInput {
  @Field({ description: 'ID' })
  id: string
}
