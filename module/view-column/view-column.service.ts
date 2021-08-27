import { ViewColumnRepository } from '@generated/view-column/view-column.repository'
import { Injectable } from '@tiejs/common'
@Injectable()
export class ViewColumnService {
  constructor(private viewColumnRepository: ViewColumnRepository) {}

  /**
   * 获取最大行的 index
   * @param viewId
   */
  async getMaxViewColumnSort(viewId: string): Promise<number> {
    const { maxRowSort = 0 } = (await this.viewColumnRepository
      .createQueryBuilder()
      .where({ viewId })
      .select('MAX(sortBaseView)', 'maxRowSort')
      .getRawOne()) as any

    return maxRowSort
  }
}
