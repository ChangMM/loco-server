import bcrypt from 'bcrypt'
import axios from 'axios'
import { stringify } from 'qs'
import { Injectable, InjectConfig } from '@tiejs/common'
import { InjectEmitter } from '@tiejs/event'
import { Exception } from '@tiejs/exception'
import EventEmitter from 'eventemitter3'
import { RegisterByEmailInput, LoginByEmailInput } from './auth.input'
import { LoginSuccessPayload } from './auth.type'
import { errors } from '@shared/errors'
import { User } from '@module/user/user.entity'
import { GithubUser } from '@module/auth/github-user.interface'
import { useRepositories } from '@shared/als'
import { AuthUtil } from './auth.util'
import { UserType } from '@module/user/user.type'
import { Auth } from '@shared/interface/auth'
import { UserRepository } from '@generated/user/user.repository'
import { TeamService } from '@module/team/team.service'
import { nanoid } from 'nanoid'
import { TableService } from '@module/table/table.service'
import { Visit } from '@generated/entities'

@Injectable()
export class AuthService {
  constructor(
    @InjectEmitter() private emitter: EventEmitter,
    @InjectConfig('auth') private auth: Auth,
    private userRepository: UserRepository,
    private teamService: TeamService,
    private tableService: TableService,
    private authUtil: AuthUtil,
  ) {}

  private async getGithubUser(code: string): Promise<GithubUser> {
    const params = {
      client_id: this.auth.githubOauth.clientID,
      client_secret: this.auth.githubOauth.clientSecret,
      code,
    }

    /** 获取 github access token */
    const tokenRes = await axios({
      method: 'post',
      url: 'https://github.com/login/oauth/access_token?' + stringify(params),
      headers: {
        accept: 'application/json',
      },
    })

    const { data } = tokenRes

    if (data.error) {
      throw new Exception({
        code: data.error,
        type: data.error,
        message: data.error_description,
      })
    }

    const accessToken = data.access_token

    /** 获取 github 用户信息 */
    const userRes = await axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`,
      },
    })

    return userRes.data
  }

  /**
   * 初始化 visit 数据，如果没有初始化，就初始化
   * @param userId
   */
  private async initVisitData(userId: number) {
    const repos = useRepositories()
    const visit = await repos.visitRepository.findOne({ userId })
    if (visit) return
    repos.visitRepository.save({ userId })
  }

  async loginByGithub(code: string): Promise<LoginSuccessPayload> {
    const githubUser = await this.getGithubUser(code)

    const repos = useRepositories()

    // 用户已存在，直接登录生产 token
    const userExist = await this.userRepository.findOne({ githubId: githubUser.id })
    // const userExist = await this.userRepository.findOne({ githubId: 2668081 })

    if (userExist) {
      const { id: userId } = userExist
      this.emitter.emit('LoginSuccess', userExist)
      return {
        token: this.authUtil.generateToken(userId, UserType.user),
        userId,
        user: userExist,
        visit: {} as any, // TODO:
      }
    }

    /** 注册新用户 */
    const newUser = {
      login: githubUser.login,
      githubId: githubUser.id,
      bio: githubUser.bio,
      avatar: githubUser.avatar_url,
      nickname: githubUser.name,
      email: githubUser.email,
    } as User

    const user = await repos.userRepository.save(newUser)

    this.emitter.emit('RegisterSuccess', user)

    // const userWithTeamId = await this.initTeamDataForNewUser(user)

    return {
      token: this.authUtil.generateToken(user.id, UserType.user),
      userId: user.id,
      // user: userWithTeamId,
      user,
      visit: {} as any, // TODO:
    }
  }

  async registerByEmail(input: RegisterByEmailInput): Promise<LoginSuccessPayload> {
    let visit: Visit | undefined
    const { email } = input
    const repos = useRepositories()

    // 用户已注册
    const userByEmail = await repos.userRepository.findOne({ email })
    if (userByEmail) throw new Exception(errors.EmailExist)

    const password = await this.authUtil.hashPassword(input.password)

    const index = email.indexOf('@')
    const name = email.substring(0, index)
    const user = await repos.userRepository.save({
      email,
      password,
      username: name,
      nickname: name,
      avatar: 'https://avatars.githubusercontent.com/u/2668081?v=4',
    })

    const team = await this.teamService.initTeamDataForNewUser(user)

    const userId = user.id
    const [table, view] = await this.tableService.addTable({
      id: nanoid(),
      userId,
      teamId: team.id,
      name: 'Demo project',
    })

    visit = await repos.visitRepository.findOne({ userId })
    if (!visit) {
      visit = await repos.visitRepository.save({
        userId,
        teamId: team.id,
        tableId: table.id,
        viewId: view.id,
        viewType: view.type,
      })
    }

    const payload = this.authUtil.getLoginSuccessPayload(user, visit)

    this.emitter.emit('RegisterSuccess', user.id)
    return payload
  }

  async loginByEmail(input: LoginByEmailInput): Promise<LoginSuccessPayload> {
    const repos = useRepositories()
    const { email, password } = input

    /** 检查是否已注册 */
    const user = await repos.userRepository.findOne({ email })
    if (!user) throw new Exception(errors.EmailInvalid)

    const visit = await repos.visitRepository.findOneOrFail({ userId: user.id })

    await this.initVisitData(user.id)

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Exception(errors.PasswordInvalid)

    const payload = this.authUtil.getLoginSuccessPayload(user, visit)
    this.emitter.emit('LoginSuccess', user.id)
    return payload
  }
}
