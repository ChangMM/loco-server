import { RoleType } from '@shared/enum/role-type.enum'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class RoleInput {
  @Field(() => RoleType, { description: '角色名' })
  name: RoleType
}

@InputType({ description: '创建' })
export class CreateRoleInput extends RoleInput {}

@InputType({ description: '更新条件' })
export class UpdateRoleWhereInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id?: number
}

@InputType({ description: '更新data' })
export class UpdateRoleDataInput extends RoleInput {}

@InputType({ description: '删除' })
export class DeleteRoleInput extends RoleInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id: number
}
