import { join } from 'path'
import { Options } from 'koa-bodyparser'
import { Auth } from '@shared/interface/auth'

const env = process.env.NODE_ENV || 'development'

const isProd = env === 'production'

class Config {
  port = process.env.PORT || 5001

  view = {
    dir: join(process.cwd(), 'views'),
    map: {
      html: 'handlebars',
    },
  }

  body: Options = {
    formLimit: '50mb',
    jsonLimit: '50mb',
    textLimit: '50mb',
  }

  auth: Auth = {
    secret: {
      user: 'cash-gift-user-1919',
      admin: 'cash-gift-user-2020',
    },

    // 这些查询不需要登录
    queryWhiteList: [
      '__schema',
      'loginByPassword',
      'registerByEmail',
      'loginByEmail',
      'loginByGithub',
    ],

    // 对外(client)暴露的接口，默认 admin 全部可用
    clientWhiteList: [],

    githubOauth: isProd
      ? {
          clientID: 'a6471688c9cf9b60c68d',
          clientSecret: '9b319cadda3e5b76400dda951f65e8120f2f7689',
        }
      : {
          clientID: '340a89a4aae1c7d9181f',
          clientSecret: '3c91b69e4d0af9e4488b8b282c2e27b42993a4eb',
        },
  }
  debug = true
}

export default new Config()
