import { registerEnumType } from 'type-graphql'

export enum Role {
  owner = 'owner', // 所有者
  admin = 'admin', // 管理员
  member = 'member', // 可以编辑
  guest = 'guest', // 只读
}

registerEnumType(Role, {
  name: 'Role',
  description: '成员角色',
})
