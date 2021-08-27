import { registerEnumType } from 'type-graphql'

export enum RoleType {
  Owner = 'Owner',
  Admin = 'Admin',
  Editor = 'Editor',
  Commenter = 'Commenter',
  Reader = 'Reader',
}

registerEnumType(RoleType, {
  name: 'RoleType',
  description: '角色类型',
})
