import { registerEnumType } from 'type-graphql'

export enum DateFormat {
  Slash = 'Slash', // 2020/08/08
  Line = 'Line', // 2020-08-08
  Friendly = 'Friendly', // 2020年08月08
  Us = 'Us', // 08/28/2020
}

registerEnumType(DateFormat, {
  name: 'DateFormat',
})
