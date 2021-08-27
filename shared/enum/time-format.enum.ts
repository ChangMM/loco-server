import { registerEnumType } from 'type-graphql'

export enum TimeFormat {
  TwelveHour = 'TwelveHour',
  TwentyFourHour = 'TwentyFourHour',
}

registerEnumType(TimeFormat, {
  name: 'TimeFormat',
})
