import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { Injectable, InjectConfig } from '@tiejs/common'
import { LoginSuccessPayload, SignPayload } from './auth.type'
import { Auth } from '@shared/interface/auth'
import { User } from '@module/user/user.entity'
import { UserType } from '@module/user/user.type'
import { Visit } from '@generated/entities'

@Injectable()
export class AuthUtil {
  constructor(@InjectConfig('auth') private authConfig: Auth) {}

  /**
   * 生成 jwt token
   * @param userId 用户id，普通用户或者管理后台用户
   * @param userType user|admin
   */
  generateToken(userId: number, userType: UserType): string {
    const payload: SignPayload = {
      userType,
      uid: userId,
      iat: moment().unix(),
      exp: moment().add(30, 'days').unix(),
    }
    const secret = this.authConfig.secret[userType]
    return jwt.sign(payload, secret)
  }

  verifyToken(token: string): SignPayload {
    const { secret } = this.authConfig

    try {
      const adminData: any = jwt.verify(token, secret.admin)
      if (adminData) return adminData
    } catch (error) {}

    try {
      const userData: any = jwt.verify(token, secret.user)
      if (userData) return userData
    } catch (error) {}
    throw new Error('token 校验不通过')
  }

  /**
   * 登录成功后返回客户端的数据
   * @param user
   * @param visit
   * @returns
   */
  getLoginSuccessPayload(user: User, visit: Visit): LoginSuccessPayload {
    const { id: userId } = user
    const token = this.generateToken(userId, UserType.user)
    return { token, userId, user, visit }
  }

  /**
   *  hash user password
   * @param password
   * @returns
   */
  async hashPassword(password: string) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
  }
}
