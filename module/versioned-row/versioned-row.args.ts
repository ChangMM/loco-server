import { Field, ArgsType, InputType } from 'type-graphql'

@ArgsType()
export class QueryVersionedRowArgs {
  @Field({ description: 'ID' })
  id: string
}

@InputType({ description: '筛选条件' })
export class VersionedRowWhereInput {
  @Field({ description: '表格ID' })
  tableId: string

  @Field({ description: '版本ID' })
  versionId: number
}
