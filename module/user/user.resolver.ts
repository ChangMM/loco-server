import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { User } from '@module/user/user.entity'
import { UserService } from './user.service'
import { ModifyPasswordInput } from './user.input'
import { TokenUserId } from '@shared/decorators/TokenUserId'
import { Injectable } from '@tiejs/common'

@Injectable()
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { description: '搜索用户' })
  async searchUsers(@Arg('q') q: string): Promise<User[]> {
    return await this.userService.searchUsers(q)
  }

  @Mutation(() => Boolean, { description: '修改密码' })
  async modifyPassword(
    @Arg('input') input: ModifyPasswordInput,
    @TokenUserId() userId: number,
  ): Promise<boolean> {
    return await this.userService.modifyPassword(input, userId)
  }
}
