import { registerEnumType } from 'type-graphql'

export enum LeadingType {
  Short = 'Short',
  Medium = 'Medium',
  Tall = 'Tall',
  ExtraTall = 'ExtraTall',
}

registerEnumType(LeadingType, {
  name: 'LeadingType',
  description: '行高类型',
})
