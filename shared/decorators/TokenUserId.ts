import { createParamDecorator } from 'type-graphql'
import { Context, Container } from '@tiejs/common'
import { ReqUtil } from '@shared/util/req.util'

export function TokenUserId() {
  return createParamDecorator<Context>(({ context }) => {
    const reqUtil = Container.get(ReqUtil)
    const token = reqUtil.getToken(context)
    const { uid } = reqUtil.verify(token)
    return uid
  })
}
