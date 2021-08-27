import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Injectable } from '@tiejs/common'
import { RowService } from './row.service'
import { Row } from '@module/row/row.entity'
import { AddRowInput, AddRowWithDataInput, ModifyRowInput, RemoveRowInput } from './row.input'
import { Transactional } from '@shared/als'

@Injectable()
@Resolver(() => Row)
export class RowResolver {
  constructor(private rowService: RowService) {}

  @Query(() => Number, { description: '最大行index' })
  async maxRowSort(@Arg('tableId') tableId: string): Promise<number> {
    return await this.rowService.getMaxRowSort(tableId)
  }

  @Query(() => Row, { description: '最大的行' })
  async maxRow(@Arg('tableId') tableId: string): Promise<Row> {
    return await this.rowService.getMaxRow(tableId)
  }

  @Mutation(() => Row, { description: '新增Table行' })
  @Transactional()
  async addRow(@Arg('input') input: AddRowInput): Promise<Row> {
    return await this.rowService.addRow(input)
  }

  @Mutation(() => Row, { description: '新增带有数据的行' })
  async addRowWithData(@Arg('input') input: AddRowWithDataInput): Promise<Row> {
    return await this.rowService.addRowWithData(input)
  }

  @Mutation(() => Boolean, { description: '新增Table行' })
  async modifyRow(@Arg('input') input: ModifyRowInput): Promise<boolean> {
    return await this.rowService.modifyRow(input)
  }

  @Mutation(() => Boolean, { description: '删除Table行' })
  @Transactional()
  async removeRow(@Arg('input') input: RemoveRowInput): Promise<boolean> {
    return await this.rowService.removeRow(input)
  }
}
