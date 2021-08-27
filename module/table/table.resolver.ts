import { Resolver, Mutation, Arg } from 'type-graphql'
import { TableService } from './table.service'
import { AddTableInput, RemoveTableInput, SetAsLastVisitedInput } from './table.input'
import { Table } from '@module/table/table.entity'
import { Transactional } from '@shared/als'
import { Injectable } from '@tiejs/common'

@Injectable()
@Resolver(() => Table)
export class TableResolver {
  constructor(private tableService: TableService) {}

  @Mutation(() => Table, { description: '创建Table' })
  @Transactional()
  async addTable(@Arg('input') args: AddTableInput): Promise<Table> {
    const [table] = await this.tableService.addTable(args)
    return table
  }

  @Mutation(() => Boolean, { description: '删除Table' })
  @Transactional()
  async removeTable(@Arg('input') args: RemoveTableInput): Promise<boolean> {
    return await this.tableService.removeTable(args)
  }

  @Mutation(() => Boolean, { description: '最近访问' })
  async setAsLastVisited(@Arg('input') args: SetAsLastVisitedInput): Promise<boolean> {
    return await this.tableService.setAsLastVisited(args)
  }
}
