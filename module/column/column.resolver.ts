import { Arg, Mutation, Resolver } from 'type-graphql'
import { ColumnService } from './column.service'
import { AddColumnInput, ModifyColumnInput, RemoveColumnInput } from './column.input'
import { Column } from '@generated/entities'
import { Transactional } from '@shared/als'
import { Injectable } from '@tiejs/common'

@Injectable()
@Resolver(() => Column)
export class ColumnResolver {
  constructor(private columnService: ColumnService) {}

  @Mutation(() => Column, { description: '新增Table列' })
  @Transactional()
  async addColumn(@Arg('input') input: AddColumnInput): Promise<Column> {
    return await this.columnService.addColumn(input)
  }

  @Mutation(() => Boolean, { description: '删除Table列' })
  async removeColumn(@Arg('input') input: RemoveColumnInput): Promise<boolean> {
    return await this.columnService.romveColumn(input)
  }

  @Mutation(() => Boolean, { description: '修改列' })
  @Transactional()
  async modifyColumn(@Arg('input') input: ModifyColumnInput): Promise<boolean> {
    return await this.columnService.modifyColumn(input)
  }
}
