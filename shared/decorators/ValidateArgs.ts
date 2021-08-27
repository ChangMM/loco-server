import { createMethodDecorator } from 'type-graphql'
import { Context } from '@tiejs/common'

export function ValidateArgs() {
  return createMethodDecorator<Context>(async ({ context }, next) => {
    console.log('url----------', context.url)
    return next()
  })
}
