import { Field, InputType } from 'type-graphql'

@InputType()
export class VersionInput {
  @Field({ description: '表格ID' })
  tableId: string

  @Field({ description: '名字' })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string
}

@InputType({ description: '创建' })
export class CreateVersionInput extends VersionInput {}

@InputType({ description: '更新条件' })
export class UpdateVersionWhereInput {
  @Field({ description: 'ID' })
  id: number
}

@InputType({ description: '更新data' })
export class UpdateVersionDataInput {
  @Field({ description: '名字' })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string
}

@InputType({ description: '删除' })
export class DeleteVersionInput {
  @Field({ description: 'ID' })
  id: number
}

@InputType({ description: '创建' })
export class AddVersionInput {
  @Field({ description: '表格ID' })
  tableId: string

  @Field({ description: '名字' })
  name: string
}
