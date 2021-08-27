import { useHeaderParams, useRepositories } from '@shared/als'
import { View } from '@module/view/view.entity'
import { TableService } from '@module/table/table.service'
import { Injectable } from '@tiejs/common'
import { AddViewInput, RemoveViewInput } from './view.input'

@Injectable()
export class ViewService {
  constructor(private tableService: TableService) {}

  async addView(params: AddViewInput): Promise<View> {
    const repos = useRepositories()
    const { tableId } = params
    const viewCount = await repos.viewRepository.count({ tableId })
    const view = await repos.viewRepository.save({ ...params, sortBaseTable: viewCount + 1 })
    const columns = await repos.columnRepository.find({ tableId })
    await this.tableService.initViewColumns(tableId, view.id, columns)

    return view
  }

  async removeView({ id }: RemoveViewInput): Promise<boolean> {
    const repos = useRepositories()
    const { tableId } = useHeaderParams()

    await Promise.all([
      repos.viewRepository.softDelete({ id }),
      repos.viewColumnRepository.softDelete({ viewId: id }),
    ])

    const newView = await repos.viewRepository.findOneOrFail(
      { tableId },
      { order: { sortBaseTable: 'ASC' } },
    )

    await Promise.all([
      repos.tableRepository.update(tableId, {
        lastVisitedViewId: newView.id,
      }),
    ])
    return true
  }
}
