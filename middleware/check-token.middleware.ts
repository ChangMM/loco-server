import { intersection } from 'lodash'
import { Injectable } from '@tiejs/common'
import { InjectConfig } from '@tiejs/common'
import { Context } from 'koa'
import { Auth } from '@shared/interface/auth'
import { ReqUtil } from '@shared/util/req.util'
import { Exception } from '@tiejs/exception'
import { errors } from '@shared/errors'

export function isAllInWhiteList(queryWhiteList: string[], names: string[]) {
  const result = intersection(queryWhiteList, names)
  return result.length === names.length
}

@Injectable()
export default class CheckToken {
  constructor(@InjectConfig('auth') private auth: Auth, private reqUtil: ReqUtil) {}

  use = async (ctx: Context, next: any) => {
    const { url = '' } = ctx.req
    if (!url.startsWith('/graphql')) return await next()

    const names = this.reqUtil.getQueryNames(ctx)
    const { queryWhiteList = [], clientWhiteList = [] } = this.auth

    // 不需要token的接口
    const canNext = isAllInWhiteList(queryWhiteList, names)
    if (canNext) return await next()

    const token = this.reqUtil.getToken(ctx)
    const data: any = this.reqUtil.verify(token)

    // 限制客户端的接口访问，按配置暴露
    const isInClient = isAllInWhiteList(clientWhiteList, names)
    if (!isInClient && data.userType === 'user') {
      throw new Exception(errors.UnauthorizedQueryEndpoint)
    }

    await next()
  }
}
