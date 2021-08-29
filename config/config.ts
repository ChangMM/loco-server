import { join } from 'path'
import { Options } from 'koa-bodyparser'
import { Auth } from '@shared/interface/auth'

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

    githubOauth: {
      clientID: '4909444917febd04be0b',
      clientSecret: 'a9c478e3e13e61e9fcac79efb817f097b922fe91',
    },
  }
  debug = true
}

export default new Config()
