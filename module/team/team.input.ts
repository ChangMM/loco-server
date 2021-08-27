import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class TeamInput {
  @Field(() => Int, { description: '创建者用户ID' })
  creatorId: number

  @Field(() => Int, { description: '所有者ID' })
  ownerId: number

  @Field({ description: '唯一用户名' })
  login: string

  @Field({ description: '名字' })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string

  @Field({ description: '头像' })
  avatar: string

  @Field({ description: '是否公开' })
  public: boolean
}

@InputType({ description: '创建' })
export class CreateTeamInput extends TeamInput {}

@InputType({ description: '更新条件' })
export class UpdateTeamWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateTeamDataInput extends TeamInput {}

@InputType({ description: '删除' })
export class DeleteTeamInput extends TeamInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '添加团队' })
export class AddTeamInput {
  @Field({ description: '名字' })
  name: string
}
