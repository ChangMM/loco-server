import { Field, InputType } from 'type-graphql'

@InputType()
export class OrgInput {
  @Field({ description: '名字' })
  name: string

  @Field({ description: '描述', nullable: true })
  description: string

  @Field({ description: '头像' })
  avatar: string
}

@InputType({ description: '创建' })
export class CreateOrgInput extends OrgInput {}

@InputType({ description: '更新条件' })
export class UpdateOrgWhereInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '更新data' })
export class UpdateOrgDataInput extends OrgInput {}

@InputType({ description: '删除' })
export class DeleteOrgInput extends OrgInput {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '添加组织' })
export class AddOrgInput {
  @Field({ description: '名字' })
  name: string
}
