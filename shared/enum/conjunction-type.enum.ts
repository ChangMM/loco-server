import { registerEnumType } from 'type-graphql'

export enum ConjunctionType {
  Or = 'Or',
  And = 'And',
}

registerEnumType(ConjunctionType, {
  name: 'ConjunctionType',
  description: '筛选连接类型',
})
