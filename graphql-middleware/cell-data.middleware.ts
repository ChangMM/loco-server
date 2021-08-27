import { FieldType } from '@shared/enum/field-type.enum'
import { Cell } from '@module/cell/cell.entity'
import { isString, isNumber, isArray } from 'class-validator'
import { MiddlewareFn } from 'type-graphql'

interface Action {
  root: Cell
}

function parseValue(cell: Cell) {
  if (cell.data === null) return null
  try {
    const ojb = JSON.parse(cell.data)
    return ojb?.value
  } catch (error) {
    return null
  }
}

/** 校验数据 */
function validateValue(value: any, fieldType: FieldType) {
  if (value === null) return

  if (
    [
      FieldType.SingleLineText,
      FieldType.LongText,
      FieldType.SingleSelect,
      FieldType.CreatedAt,
      FieldType.UpdatedAt,
    ].includes(fieldType)
  ) {
    if (!isString(value)) throw new Error(`当字段类型为 ${fieldType} 时，data必须为字符串类型`)
  }

  if ([FieldType.CreatedBy, FieldType.LastUpdatedBy].includes(fieldType)) {
    if (!isNumber(value)) throw new Error(`当字段类型为 ${fieldType} 时，data必须为数字类型`)
  }

  if ([FieldType.Collaborator].includes(fieldType)) {
    if (!isArray(value)) throw new Error(`当字段类型为 ${fieldType}时，data必须为数组类型`)
  }
}

export const CellDataMiddleware: MiddlewareFn = async ({ root }: Action, next) => {
  const value = parseValue(root)

  validateValue(value, root.fieldType)

  root.data = value
  return next()
}
