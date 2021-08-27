import { MiddlewareConfig } from '@tiejs/common'
import { join } from 'path'
import serve from 'koa-static'
import error from '@middleware/error.middleware'
import { als } from '@shared/als'
// import { ReqUtil } from '@common/util/req.util'

export const middlewares: MiddlewareConfig = [
  {
    name: 'als',
    use: async (ctx, next) => {
      await als.run(new Map(), async () => {
        const store = als.getStore() as any
        store.set('ctx', ctx)
        try {
          await next()
        } catch (error) {
          // throw error
          ctx.throw(error)
        }
      })
    },
  },
  {
    name: 'error',
    use: error,
  },

  {
    name: 'static',
    use: serve(join(process.cwd(), 'public')),
  },
]
