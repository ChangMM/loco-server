import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '@module/user/user.entity'
import { AuthService } from './auth.service'
import { RegisterByEmailInput, LoginByEmailInput } from './auth.input'
import { LoginSuccessPayload } from './auth.type'
import { Injectable } from '@tiejs/common'
import { Transactional } from '@shared/als'

@Injectable()
@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginSuccessPayload, { description: '使用Github登录' })
  @Transactional()
  async loginByGithub(@Arg('code') code: string): Promise<LoginSuccessPayload> {
    return await this.authService.loginByGithub(code)
  }

  @Mutation(() => LoginSuccessPayload, { description: '邮箱注册' })
  @Transactional()
  async registerByEmail(@Arg('input') input: RegisterByEmailInput): Promise<LoginSuccessPayload> {
    return await this.authService.registerByEmail(input)
  }

  @Mutation(() => LoginSuccessPayload, { description: '邮箱登录' })
  @Transactional()
  async loginByEmail(@Arg('input') input: LoginByEmailInput): Promise<LoginSuccessPayload> {
    return await this.authService.loginByEmail(input)
  }
}
