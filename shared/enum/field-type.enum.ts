import { registerEnumType } from 'type-graphql'

export enum FieldType {
  Locale = 'Locale',
  Key = 'Key',
  Namespace = 'Namespace',
  SingleLineText = 'SingleLineText',
  LongText = 'LongText',
  Collaborator = 'Collaborator', // 成员
  SingleSelect = 'SingleSelect',
  CreatedAt = 'CreatedAt',
  UpdatedAt = 'UpdatedAt',
  CreatedBy = 'CreatedBy',
  LastUpdatedBy = 'LastUpdatedBy',
}

registerEnumType(FieldType, {
  name: 'FieldType',
  description: '字段类型',
})
