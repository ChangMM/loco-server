import { errors } from '@shared/errors'
import { CellRepository } from '@generated/cell/cell.repository'
import { OptionRepository } from '@generated/option/option.repository'
import { TableRepository } from '@generated/table/table.repository'
import { Injectable } from '@tiejs/common'
import { Exception } from '@tiejs/exception'
import DataLoader from 'dataloader'
import { uniq } from 'lodash'
import { In } from 'typeorm'
import { ModifyCellInput } from './cell.input'

@Injectable()
export class CellService {
  constructor(
    private optionRepository: OptionRepository,
    private cellRepository: CellRepository,
    private tableRepository: TableRepository,
  ) {}

  cellDataToIds(data: any): string[] {
    if (!data) return []
    return data.split(',').map((i: any) => i.trim())
  }

  /**
   * 获取单元格的 options
   * @memberof CellService
   */
  cellOptionsLoader = new DataLoader<string, any>((keys) => {
    this.cellOptionsLoader.clearAll()
    return new Promise((resolve, reject) => {
      const groupedIds = keys.map((key) => this.cellDataToIds(key))
      const allIds = groupedIds.reduce<string[]>((result, key) => [...result, ...key], [])

      this.optionRepository
        .find({ where: { id: In(uniq(allIds)) } })
        .then((options) => {
          const filterData = groupedIds.map((ids) =>
            options.filter((option) => ids.includes(option.id)),
          )
          resolve(filterData)
        })
        .catch((e) => {
          reject(e)
        })
    })
  })

  async getTeamIdByCellId(cellId: string): Promise<string> {
    const cell = await this.cellRepository.findOneOrFail(cellId)
    const table = await this.tableRepository.findOneOrFail(cell.tableId)
    return table.teamId
  }

  async modifyCell(input: ModifyCellInput): Promise<boolean> {
    const { columnId, rowId, data } = input
    const cell = await this.cellRepository.findOne({ columnId, rowId })

    if (!cell) throw new Exception(errors.CellForMutateNotExist)
    await this.cellRepository.update({ columnId, rowId }, { data })
    return true
  }
}
