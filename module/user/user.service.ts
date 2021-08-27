import bcrypt from 'bcrypt'
import { Injectable } from '@tiejs/common'
import { Exception } from '@tiejs/exception'
import { ModifyPasswordInput } from './user.input'
import { errors } from '@shared/errors'
import { User } from '@module/user/user.entity'
import { UserRepository } from '@generated/user/user.repository'
import { UserCrudService } from '@generated/user/user.service'
import { Like } from 'typeorm'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private userCrudService: UserCrudService) {}

  private async hashPassword(password: string) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
  }

  async searchUsers(q: string): Promise<User[]> {
    if (!q) return []
    const like = Like(`%${q}%`)
    return await this.userRepository.find({
      where: [{ email: like }, { nickname: like }],
      take: 10,
    })
  }

  async modifyPassword(input: ModifyPasswordInput, userId: number): Promise<boolean> {
    const { oldPassword, newPassword } = input
    const user = await this.userCrudService.findOne({ id: userId })
    const match = await bcrypt.compare(oldPassword, user.password)
    if (!match) throw new Exception(errors.OldPasswordInvalid)

    const password = await this.hashPassword(newPassword)
    this.userRepository.update({ id: userId }, { password })
    return true
  }
}
