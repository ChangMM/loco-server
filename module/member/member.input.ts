import { RoleType } from '@shared/enum/role-type.enum'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class MemberInput {
  @Field({ description: '团队ID' })
  teamId: string

  @Field(() => Int, { description: '用户ID' })
  userId: number
}

@InputType({ description: '创建' })
export class CreateMemberInput extends MemberInput {}

@InputType({ description: '添加成员' })
export class AddMemberInput {
  @Field({ description: '团队ID' })
  teamId: string

  @Field(() => Int, { description: '用户ID' })
  userId: number

  @Field(() => RoleType, { description: '角色类型' })
  roleType: RoleType
}

@InputType({ description: '修改成员角色类型' })
export class ModifyMemberRoleTypeInput {
  @Field({ description: 'member ID' })
  id: string

  @Field(() => RoleType, { description: '角色类型' })
  roleType: RoleType
}

@InputType({ description: '更新条件' })
export class UpdateMemberWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateMemberDataInput extends MemberInput {}

@InputType({ description: '删除成员' })
export class DeleteMemberInput {
  @Field({ description: 'member ID' })
  id: string
}

@InputType({ description: '删除成员' })
export class RemoveMemberInput {
  @Field({ description: 'member ID' })
  id: string
}

@InputType({ description: '退出团队' })
export class ExitTeamInput {
  @Field({ description: 'member ID' })
  id: string
}
