import { Field, Int, InputType } from 'type-graphql'

@InputType()
export class UserInput {
  @Field()
  username: string

  @Field()
  nickname: string
}

@InputType({ description: '创建' })
export class CreateUserInput extends UserInput {}

@InputType({ description: '更新条件' })
export class UpdateUserWhereInput {
  @Field(() => Int, { description: 'ID', nullable: true })
  id?: number
}

@InputType({ description: '更新data' })
export class UpdateUserDataInput {
  @Field({ description: '唯一标识', nullable: true })
  login: string

  @Field({ description: '用户名', nullable: true })
  username: string

  @Field({ description: '昵称', nullable: true })
  nickname: string

  @Field({ description: '个人简介', nullable: true })
  bio: string

  @Field({ description: '邮箱', nullable: true })
  email: string

  @Field({ description: '职业', nullable: true })
  jobTitle: string
}

@InputType({ description: '删除' })
export class DeleteUserInput extends UserInput {
  @Field(() => Int, { description: 'id', nullable: true })
  id: number
}

@InputType({ description: '时间' })
export class DateInput {
  @Field({ description: '开始时间', nullable: true })
  startAt: string

  @Field({ description: '结束时间', nullable: true })
  endAt: string
}

@InputType({ description: '校验激活码' })
export class CheckUserInput {
  @Field(() => Int, { description: 'id', nullable: true })
  userId: number

  @Field({ description: '手机号码', nullable: true })
  phone: string

  @Field({ description: '验证码', nullable: true })
  verifyCode: string

  @Field({ description: '激活码', nullable: true })
  code: string
}

@InputType({ description: '修改秘密' })
export class ModifyPasswordInput {
  @Field({ description: '旧密码' })
  oldPassword: string

  @Field({ description: '新密码' })
  newPassword: string
}
