import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class TableInput {
  @Field({ description: '团队ID' })
  teamId: string

  @Field({ description: '名字' })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string
}

@InputType({ description: '创建' })
export class CreateTableInput {
  @Field({ description: 'ID' })
  id: string

  @Field({ description: '团队ID' })
  teamId: string

  @Field({ description: '名字' })
  name: string
}

@InputType({ description: '更新条件' })
export class UpdateTableWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateTableDataInput {
  @Field({ description: '名字' })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string

  @Field({ description: '行距', nullable: true })
  leading: string
}

@InputType({ description: '删除' })
export class DeleteTableInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '删除表格' })
export class RemoveTableInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '新建表格' })
export class AddTableInput {
  @Field({ description: 'ID' })
  id: string

  @Field({ description: '团队ID' })
  teamId: string

  @Field(() => Int, { description: '用户ID' })
  userId: number

  @Field({ description: '名字' })
  name: string
}

@InputType({ description: '最近访问' })
export class SetAsLastVisitedInput {
  @Field({ description: '表格ID', nullable: true })
  tableId: string

  @Field({ description: '视图ID' })
  viewId: string
}
