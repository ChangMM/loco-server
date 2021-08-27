import { FieldType } from './enum/field-type.enum'

export const fieldTypeMaps: Record<FieldType, 'string' | 'number' | 'boolean' | 'array'> = {
  Locale: 'string',
  Key: 'string',
  Namespace: 'string',
  SingleLineText: 'string',
  LongText: 'string',
  Collaborator: 'string',
  SingleSelect: 'string',
  CreatedAt: 'string',
  UpdatedAt: 'string',
  CreatedBy: 'string',
  LastUpdatedBy: 'string',
}
