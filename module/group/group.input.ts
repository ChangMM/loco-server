import { Field, InputType } from 'type-graphql'

@InputType()
export class GroupInput {
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
export class CreateGroupInput extends GroupInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新条件' })
export class UpdateGroupWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateGroupDataInput {
  @Field({ description: '列ID', nullable: true })
  columnId: string

  @Field({ description: '是否升序', nullable: true })
  ascending: boolean
}

@InputType({ description: '删除' })
export class DeleteGroupInput {
  @Field({ description: 'ID' })
  id: string
}
