import { Column } from '@generated/entities'
import { MiddlewareFn } from 'type-graphql'

interface Action {
  root: Column
}

function parseValue(column: Column) {
  if (column.config === null) return null
  try {
    return JSON.parse(column.config)
  } catch (error) {
    return null
  }
}

export const JsonMiddleware: MiddlewareFn = async ({ root }: Action, next) => {
  const value = parseValue(root)

  root.config = value
  return next()
}
