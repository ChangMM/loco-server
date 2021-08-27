import { Field, ObjectType, Int } from 'type-graphql'
import { User } from '@module/user/user.entity'
import { UserType } from '@module/user/user.type'
import { Visit } from '@generated/entities'

export interface SignPayload {
  userType: UserType
  uid: number
  iat: number
  exp: number
}

@ObjectType({ description: '登录成功返回给客户端的数据' })
export class LoginSuccessPayload {
  @Field()
  token: string

  @Field(() => Int)
  userId: number

  @Field({ nullable: true })
  username?: string

  @Field()
  user: User

  @Field()
  visit: Visit
}
