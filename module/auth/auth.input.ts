import { Field, InputType } from 'type-graphql'
import { IsNotEmpty, IsEmail } from 'class-validator'

@InputType({ description: '邮箱登录' })
export class UserSignInput {
  @Field({ description: '邮箱' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '请填写邮箱' })
  email: string

  @Field({ description: '密码' })
  @IsNotEmpty({ message: '请填密码' })
  password: string
}

@InputType({ description: '邮箱注册' })
export class RegisterByEmailInput extends UserSignInput {}

@InputType({ description: '邮箱登录' })
export class LoginByEmailInput extends UserSignInput {}
