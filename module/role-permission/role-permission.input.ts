import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class RolePermissionInput {
  @Field(() => Int, { description: '权限ID', nullable: true })
  permissionId: number

  @Field(() => Int, { description: '角色ID', nullable: true })
  roleId: number
}

@InputType({ description: '创建' })
export class CreateRolePermissionInput extends RolePermissionInput {}

@InputType({ description: '更新条件' })
export class UpdateRolePermissionWhereInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id?: number
}

@InputType({ description: '更新data' })
export class UpdateRolePermissionDataInput extends RolePermissionInput {}

@InputType({ description: '删除' })
export class DeleteRolePermissionInput extends RolePermissionInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id: number
}
