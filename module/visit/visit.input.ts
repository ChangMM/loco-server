import { ViewType } from '@shared/enum/view-type.enum'
import { Field, InputType } from 'type-graphql'

@InputType()
export class VisitInput {
  @Field({ description: '最近访问的 teamId' })
  teamId: string

  @Field({ description: '最近访问的 tableId' })
  tableId: string

  @Field({ description: '最近访问的viewId' })
  viewId: string

  @Field(() => ViewType, { description: '视图类型', nullable: true })
  viewType: ViewType
}

@InputType({ description: '创建' })
export class CreateVisitInput extends VisitInput {}

@InputType({ description: '更新条件' })
export class UpdateVisitWhereInput {
  @Field({ description: 'ID' })
  id: number
}

@InputType({ description: '更新data' })
export class UpdateVisitDataInput extends VisitInput {}

@InputType({ description: '删除' })
export class DeleteVisitInput {
  @Field({ description: 'ID' })
  id: number
}

@InputType({ description: '修改visit数据' })
export class ModifyVisitInput extends VisitInput {
  @Field({ description: 'ID' })
  id: number
}
