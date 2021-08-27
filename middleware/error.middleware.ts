import { Injectable, Context, NextFunction, IMiddleware } from '@tiejs/common'
import { get } from 'lodash'
import { GraphQLFormattedError } from 'graphql'
import { InjectConfig } from '@tiejs/common'
import { Exception } from '@tiejs/exception'

/**
 * 是不是 Graphql Error
 * @param body request
 */
function isGraphqlError(body: any) {
  if (typeof body !== 'string') return false
  try {
    const res = JSON.parse(body)
    return res.errors && Array.isArray(res.errors) && res.errors.length
  } catch (error) {
    return false
  }
}


/**
 * 返回客户端的 graphql 错误信息
 * @param ctx
 */
function renderGraphqlError(ctx: Context) {
  const res = JSON.parse(ctx.body as any)
  const error: GraphQLFormattedError = res.errors[0]
  const status = get(error, 'extensions.exception.status')
  const exception = get(error, 'extensions.exception') || {}
  ctx.response.status = status || 500

  const getMessage = (): string => {
    if (exception && exception.response) {
      return exception.response.message
    }
    return error.message || '未知错误'
  }


  // 参数校验错误
  if (exception.validationErrors && exception.validationErrors.length) {
    const validationError: any = exception.validationErrors[0]
    console.log('validationError:', validationError)
    ctx.body = {
      code: 'ValidationError',
      // message: Object.values(validationError.children[0].constraints)[0],
      message: Object.values(validationError.constraints)[0],
      // validationErrors: Object.values(validationError.children[0].constraints),
      validationErrors: Object.values(validationError.constraints),
      type: 'ValidationError',
      origin: error,
    }
    return
  }

  // 返回客户端异常信息
  if (exception && exception.response) {
    ctx.body = {
      ...exception.response,
      origin: error,
    }
    return
  }

  ctx.body = {
    code: get(error, 'extensions.code'),
    message: getMessage(),
    type: 'UnknownError',
    origin: error,
  }
}

@Injectable()
export default class ErrorMiddleware implements IMiddleware {
  constructor(@InjectConfig('debug') private debug: any) {}

  use = async (ctx: Context, next: NextFunction) => {
    if (ctx.url !== '/graphql') return await next()

    if (ctx.method !== 'POST') return await next()

    try {
      await next()
      if (isGraphqlError(ctx.body)) {
        renderGraphqlError(ctx)
      }
    } catch (error) {
      ctx.response.status = 400

      if (!(error instanceof Error)) {

        ctx.body = {
          message: '未知错误',
          code: 'UnknownError',
          type: 'UnknownError',
        }

        return
      }

      if (error instanceof Exception) {

        ctx.response.status = error.getStatus()

        ctx.body = {
          message: '未知错误',
          code: 'UnknownError',
          type: 'UnknownError',
          ...error.getResponse(),
        }
        return
      }


      ctx.body = {
        message: error.message,
        code: 'UnknownError',
        type: 'UnknownError',
        origin: this.debug ? error.stack : '',
      }
    }
  }
}
