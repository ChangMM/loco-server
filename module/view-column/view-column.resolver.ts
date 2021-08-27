import { Arg, Query, Resolver } from 'type-graphql'
import { ViewColumn } from '@module/view-column/view-column.entity'
import { ViewColumnService } from './view-column.service'
import { Injectable } from '@tiejs/common'

@Injectable()
@Resolver(() => ViewColumn)
export class ViewColumnResolver {
  constructor(private viewColumnService: ViewColumnService) {}

  @Query(() => Number, { description: '最大行index' })
  async maxViewColumnSort(@Arg('viewId') viewId: string): Promise<number> {
    return await this.viewColumnService.getMaxViewColumnSort(viewId)
  }
}
