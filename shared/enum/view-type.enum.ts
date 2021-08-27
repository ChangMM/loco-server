import { registerEnumType } from 'type-graphql'

export enum ViewType {
  Grid = 'Grid',
  Form = 'Form',
  Calendar = 'Calendar',
  Gallery = 'Gallery',
  Kanban = 'Kanban',
}

registerEnumType(ViewType, {
  name: 'ViewType',
  description: '视图类型',
})
