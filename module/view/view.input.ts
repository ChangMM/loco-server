import { ViewType } from '@shared/enum/view-type.enum'
import { Field, InputType } from 'type-graphql'

@InputType()
export class ViewInput {
  @Field({ description: '名字' })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string

  @Field(() => ViewType, { description: '类型' })
  type: ViewType
}

@InputType({ description: '创建' })
export class CreateViewInput {
  @Field({ description: 'ID' })
  id: string

  @Field({ description: '表格ID' })
  tableId: string

  @Field({ description: '名字' })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string

  @Field(() => ViewType, { description: '类型' })
  type: ViewType
}

@InputType({ description: '更新条件' })
export class UpdateViewWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateViewDataInput {
  @Field({ description: '名字', nullable: true })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string

  @Field({ description: '行距', nullable: true })
  leading: string
}

@InputType({ description: '删除' })
export class DeleteViewInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '删除' })
export class RemoveViewInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '创建视图' })
export class AddViewInput {
  @Field({ description: 'ID' })
  id: string

  @Field({ description: '表格ID' })
  tableId: string

  @Field({ description: '名字' })
  name: string

  @Field(() => ViewType, { description: '类型' })
  type: ViewType

  @Field({ description: '看板基准列', nullable: true })
  stackedColumnId: string
}
