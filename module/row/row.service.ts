import { useRepositories } from '@shared/als'
import { Cell } from '@module/cell/cell.entity'
import { Row } from '@module/row/row.entity'
import { CellRepository } from '@generated/cell/cell.repository'
import { RowRepository } from '@generated/row/row.repository'
import { Injectable } from '@tiejs/common'
import { nanoid } from 'nanoid'
import { AddRowInput, AddRowWithDataInput, ModifyRowInput, RemoveRowInput } from './row.input'

@Injectable()
export class RowService {
  constructor(private rowRepository: RowRepository, private cellRepository: CellRepository) {}

  /**
   * 获取最大行的 index
   * @param tableId
   */
  async getMaxRowSort(tableId: string): Promise<number> {
    const { maxRowSort = 0 } = (await this.rowRepository
      .createQueryBuilder()
      .where({ tableId })
      .select('MAX(sortBaseTable)', 'maxRowSort')
      .getRawOne()) as any

    return maxRowSort
  }

  /**
   * 获取最大的行
   * @param tableId
   */
  async getMaxRow(tableId: string): Promise<Row> {
    const row = await this.rowRepository
      .createQueryBuilder()
      .where({ tableId })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .from(Row, 'row')
          .where(`row.tableId = ${tableId}`)
          .select('MAX(sortBaseTable)')
          .getQuery()
        return `sortBaseTable=${subQuery}`
      })
      .getOne()

    return row as Row
  }

  async addRow(params: AddRowInput): Promise<Row> {
    const repos = useRepositories()
    const { tableId, id } = params

    const [columns, maxRowSort] = await Promise.all([
      repos.columnRepository.find({ tableId }),
      this.getMaxRowSort(tableId),
    ])

    const row = await repos.rowRepository.save({
      id,
      tableId,
      sortBaseTable: maxRowSort + 1,
    } as Row)

    const cellDatas: Partial<Cell>[] = columns.map((column) => ({
      id: nanoid(),
      columnId: column.id,
      rowId: row.id,
      fieldType: column.fieldType,
      tableId,
    }))

    await repos.cellRepository.save(cellDatas)

    return row
  }

  async modifyRow({ cells }: ModifyRowInput): Promise<boolean> {
    const promises = cells.map((cell) =>
      this.cellRepository.update(
        { columnId: cell.columnId, rowId: cell.rowId },
        { data: cell.data },
      ),
    )
    await Promise.all(promises)
    return true
  }

  async removeRow(input: RemoveRowInput): Promise<boolean> {
    const repos = useRepositories()
    const { id: rowId } = input
    const row = await repos.rowRepository.findOneOrFail(input.id)
    await Promise.all([
      repos.rowRepository.softDelete(rowId),
      repos.cellRepository.softDelete({ rowId }),
      repos.rowRepository
        .createQueryBuilder()
        .update(Row)
        .set({ sortBaseTable: () => 'sortBaseTable-1' })
        .where('sortBaseTable > :sortBaseTable', { sortBaseTable: row.sortBaseTable })
        .andWhere('tableId = :id', { id: row.tableId })
        .execute(),
    ])

    return true
  }

  async addRowWithData(params: AddRowWithDataInput): Promise<Row> {
    const { tableId, cells } = params
    const maxRowSort = await this.getMaxRowSort(tableId)

    const row = await this.rowRepository.save({
      tableId,
      sortBaseTable: maxRowSort + 1,
    } as Row)

    const cellDatas: Partial<Cell>[] = cells.map((cell) => ({
      id: nanoid(),
      columnId: cell.columnId,
      rowId: row.id,
      fieldType: cell.fieldType,
      data: cell.data,
      tableId,
    }))

    await this.cellRepository.save(cellDatas)

    return row
  }
}
