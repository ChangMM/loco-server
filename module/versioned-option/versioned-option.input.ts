import { Field, InputType } from 'type-graphql'

@InputType()
export class VersionedOptionInput {
  @Field({ description: '名字', nullable: true })
  name: string

  @Field({ description: '颜色', nullable: true })
  color: string
}

@InputType({ description: '创建选项' })
export class CreateVersionedOptionInput {
  @Field({ description: 'ID' })
  id: string

  @Field({ description: '列ID' })
  columnId: string

  @Field({ description: '名字' })
  name: string

  @Field({ description: '颜色' })
  color: string
}

@InputType({ description: '更新条件' })
export class UpdateVersionedOptionWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateVersionedOptionDataInput extends VersionedOptionInput {}

@InputType({ description: '删除' })
export class DeleteVersionedOptionInput extends VersionedOptionInput {
  @Field({ description: 'ID' })
  id: string
}
