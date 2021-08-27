import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class PermissionInput {
  @Field({ description: '权限名称', nullable: true })
  name: string

  @Field({ description: '权限码', nullable: true })
  code: string
}

@InputType({ description: '创建' })
export class CreatePermissionInput extends PermissionInput {}

@InputType({ description: '更新条件' })
export class UpdatePermissionWhereInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id?: number
}

@InputType({ description: '更新data' })
export class UpdatePermissionDataInput extends PermissionInput {}

@InputType({ description: '删除' })
export class DeletePermissionInput extends PermissionInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id: number
}
