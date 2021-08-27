import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class CollaboratorInput {
  @Field({ description: '表格ID' })
  tableId: string

  @Field(() => Int, { description: '用户ID' })
  userId: number
}

@InputType({ description: '创建' })
export class CreateCollaboratorInput extends CollaboratorInput {}

@InputType({ description: '更新条件' })
export class UpdateCollaboratorWhereInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id?: number
}

@InputType({ description: '更新data' })
export class UpdateCollaboratorDataInput extends CollaboratorInput {}

@InputType({ description: '删除' })
export class DeleteCollaboratorInput extends CollaboratorInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id: number
}
