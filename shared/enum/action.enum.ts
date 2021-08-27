import { registerEnumType } from 'type-graphql'

export enum Action {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Manage = 'manage', // 任何操作
}

registerEnumType(Action, {
  name: 'Action',
  description: '权限操作类型',
})
