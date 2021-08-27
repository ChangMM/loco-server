import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class OrgUserInput {
  @Field(() => Int, { description: '用户ID' })
  userId: number
}

@InputType({ description: '创建' })
export class CreateOrgUserInput extends OrgUserInput {}

@InputType({ description: '添加成员' })
export class AddOrgUserInput {
  @Field(() => Int, { description: '用户ID' })
  userId: number
}

@InputType({ description: '更新条件' })
export class UpdateOrgUserWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateOrgUserDataInput extends OrgUserInput {}

@InputType({ description: '删除成员' })
export class DeleteOrgUserInput {
  @Field({ description: 'member ID' })
  id: string
}

@InputType({ description: '删除成员' })
export class RemoveOrgUserInput {
  @Field({ description: 'member ID' })
  id: string
}

@InputType({ description: '退出团队' })
export class ExitTeamInput {
  @Field({ description: 'member ID' })
  id: string
}
