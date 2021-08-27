import { RoleType } from '@shared/enum/role-type.enum'
import { Field, InputType } from 'type-graphql'

@InputType()
export class InvitationTokenInput {
  @Field({ description: '团队ID' })
  teamId: string
}

@InputType({ description: '创建' })
export class CreateInvitationTokenInput extends InvitationTokenInput {}

@InputType({ description: '添加成员' })
export class AddInvitationTokenInput {
  @Field({ description: '团队ID' })
  teamId: string

  @Field(() => RoleType, { description: '角色类型' })
  roleType: RoleType
}

@InputType({ description: '更新条件' })
export class UpdateInvitationTokenWhereInput {
  @Field({ description: 'ID' })
  id: number
}

@InputType({ description: '更新data' })
export class UpdateInvitationTokenDataInput extends InvitationTokenInput {}

@InputType({ description: '删除成员' })
export class DeleteInvitationTokenInput {
  @Field({ description: 'ID' })
  id: number
}
