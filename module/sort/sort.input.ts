import { Field, InputType } from 'type-graphql'

@InputType()
export class SortInput {
  @Field({ description: '列ID' })
  columnId: string

  @Field({ description: '表格ID' })
  tableId: string

  @Field({ description: '视图ID' })
  viewId: string

  @Field({ description: '是否升序' })
  ascending: boolean
}

@InputType({ description: '创建' })
export class CreateSortInput extends SortInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新条件' })
export class UpdateSortWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateSortDataInput {
  @Field({ description: '列ID', nullable: true })
  columnId: string

  @Field({ description: '是否升序', nullable: true })
  ascending: boolean
}

@InputType({ description: '删除' })
export class DeleteSortInput {
  @Field({ description: 'ID' })
  id: string
}
