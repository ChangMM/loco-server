import { createParamDecorator } from 'type-graphql'
import { Context, Container } from '@tiejs/common'
import { ReqUtil } from '@shared/util/req.util'

export function Token() {
  return createParamDecorator<Context>(({ context }) => {
    return Container.get(ReqUtil).getToken(context)
  })
}
