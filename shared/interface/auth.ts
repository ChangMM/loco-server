export interface Auth {
  secret: {
    user: string // 用户专用
    admin: string // 管理后台用户专用
  }

  // 不需要登录的接口
  queryWhiteList: string[]

  // 对外(client)暴露的接口，默认 admin 全部可用
  clientWhiteList: string[]

  githubOauth: {
    clientID: string
    clientSecret: string
  }
}
