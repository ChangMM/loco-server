import { set } from 'lodash'
import { IsNull, In, Like, Between } from 'typeorm'

export function handleArgs(args: any) {
  const { first: take, skip, orderBy = 'id_ASC' } = args

  // 解析排序
  const order = orderBy.split(',').reduce((r: { [x: string]: any }, c: string) => {
    const arr = c.split('_')
    const key = [arr[0].trim()].join('')
    r[key] = arr[1].trim()
    return r
  }, {} as any)

  const where: any = { ...(args.where || {}) }

  // 如果是数组，不处理 where
  if (Array.isArray(args.where)) {
    return { where: args.where, take, skip, order }
  }

  let newWhere = {}

  Object.keys(where).forEach((key) => {
    // 支持 IS NULL
    if (where[key] === 'isNull') {
      set(newWhere, key, IsNull())
      return
    }

    // In 关键字
    if (key.endsWith('_in')) {
      const realKey = key.replace(/_in$/, '')
      if (!where[key].length) return
      set(newWhere, realKey, In(where[key]))
      return
    }

    // like 关键字
    if (key.endsWith('_like')) {
      const realKey = key.replace(/_like$/, '')
      set(newWhere, realKey, Like(where[key]))
      return
    }

    // Between 关键字
    if (key.endsWith('_between')) {
      const realKey = key.replace(/_between$/, '')
      set(newWhere, realKey, Between(where[key][0], where[key][1]))
      return
    }

    set(newWhere, key, where[key])
  })

  return { where: newWhere, take, skip, order }
}
