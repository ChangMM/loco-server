import { registerEnumType } from 'type-graphql'

export enum OperatorType {
  IsEmpty = 'IsEmpty',
  IsNotEmpt = 'IsNotEmpt',
  Contains = 'Contains',
  DoesNotContain = 'DoesNotContain',

  Is = 'Is',
  IsNot = 'IsNot',

  Equal = 'Equal', // =
  NotEqual = 'NotEqual', //!=
  LessThan = 'LessThan', // <
  MoreThan = 'MoreThan', // >

  LessThanOrEqual = 'LessThanOrEqual', // <=
  MoreThanOrEqual = 'MoreThanOrEqual', // >=

  Filename = 'Filename',
  Filetype = 'Filetype',

  // isAnyOf,
  // isNoneOf
}

registerEnumType(OperatorType, {
  name: 'OperatorType',
  description: '操作类型',
})
