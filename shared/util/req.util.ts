import jwt from 'jsonwebtoken'
import { Injectable } from '@tiejs/common'
import { InjectConfig } from '@tiejs/common'
import gql from 'graphql-tag'
import { Context } from 'koa'
import { Auth } from '@shared/interface/auth'
import { set } from 'lodash'
import { SignPayload } from '@module/user/user.type'

@Injectable()
export class ReqUtil {
  constructor(@InjectConfig('auth') private auth: Auth) {}

  getQueryNames = (ctx: Context): string[] => {
    const { query = '' } = ctx.request.body as any
    if (!query) return []
    try {
      const parsed = gql`
        ${query}
      `
      if (parsed.definitions[0] && 'selectionSet' in parsed.definitions[0]) {
        const { selections } = parsed.definitions[0].selectionSet
        return selections.map((item: any) => item.name.value)
      }
      return []
    } catch (error) {
      return []
    }
  }

  getVariable = (ctx: Context): any => {
    let { variables: variable } = ctx.request.body as any

    if (Object.keys(variable).length) {
      return variable
    }

    const { query = '' } = ctx.request.body as any
    const variables: any = {}
    try {
      const parsed = gql`
        ${query}
      `
      if (parsed.definitions[0] && 'selectionSet' in parsed.definitions[0]) {
        const { selections } = parsed.definitions[0].selectionSet
        if ('arguments' in selections[0]) {
          const { arguments: args } = selections[0]
          if (!args) return undefined

          for (const arg of args) {
            parseVariables(arg, variables)
          }
          return variables
        }
      }
      return undefined
    } catch (error) {
      return undefined
    }
  }

  verify(token: string): SignPayload {
    const { secret } = this.auth

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

  getToken = (ctx: Context): string => {
    const authorization = ctx.get('authorization')
    if (!authorization) {
      throw new Error('headers 缺少 token')
    }
    if (!/^bearer/i.test(authorization)) {
      throw new Error('token 格式不正确')
    }
    return authorization.split(/\s{1,}/)[1]
  }
}

function parseVariables(arg: any, stack: any = {}) {
  if (arg.value.kind === 'ObjectValue') {
    set(stack, arg.name.value, {})

    for (const item of arg.value.fields) {
      parseVariables(item, stack[arg.name.value])
    }
  } else {
    set(stack, arg.name.value, arg.value.value)
  }
}
