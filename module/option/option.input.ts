import { Field, InputType } from 'type-graphql'

@InputType()
export class OptionInput {
  @Field({ description: '名字', nullable: true })
  name: string

  @Field({ description: '颜色', nullable: true })
  color: string
}

@InputType({ description: '创建选项' })
export class CreateOptionInput {
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
export class UpdateOptionWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateOptionDataInput extends OptionInput {}

@InputType({ description: '删除' })
export class DeleteOptionInput extends OptionInput {
  @Field({ description: 'ID' })
  id: string
}
