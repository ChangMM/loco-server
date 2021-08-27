import { FieldType } from '@shared/enum/field-type.enum'
import { Cell } from '@module/cell/cell.entity'
import { Column, Table, View, ViewColumn } from '@generated/entities'
import { Injectable } from '@tiejs/common'
import { AddTableInput, RemoveTableInput, SetAsLastVisitedInput } from './table.input'
import { Row } from '@module/row/row.entity'
import { ViewType } from '@shared/enum/view-type.enum'
import { nanoid } from 'nanoid'
import { TableRepository } from '@generated/table/table.repository'
import { useRepositories } from '@shared/als'

@Injectable()
export class TableService {
  constructor(private tableRepository: TableRepository) {}

  /**
   * 获取最 table 的 sort
   * @param teamId
   */
  async getMaxTableSort(teamId: string): Promise<number> {
    const { maxTableSort = 0 } = (await this.tableRepository
      .createQueryBuilder()
      .where({ teamId })
      .select('MAX(sortBaseTeam)', 'maxTableSort')
      .getRawOne()) as any

    return maxTableSort
  }

  async getMaxTableSortWithRepos(teamId: string): Promise<number> {
    const repos = useRepositories()
    const { maxTableSort = 0 } = (await repos.tableRepository
      .createQueryBuilder()
      .where({ teamId })
      .select('MAX(sortBaseTeam)', 'maxTableSort')
      .getRawOne()) as any

    return maxTableSort
  }

  /**
   * 默认初始化3列数据
   * @param tableId
   */
  private async initTableColumns(tableId: string): Promise<Column[]> {
    const repos = useRepositories()
    const initialColumns: Partial<Column>[] = [
      {
        id: nanoid(),
        tableId,
        name: '语言 Key',
        description: '语言的唯一 Key 值',
        fieldType: FieldType.Key,
        isPrimary: true,
      },
      {
        id: nanoid(),
        tableId,
        name: 'en',
        description: '英文',
        fieldType: FieldType.Locale,
      },
      {
        id: nanoid(),
        tableId,
        name: 'zh-CN',
        description: '中文简体',
        fieldType: FieldType.Locale,
      },
      {
        id: nanoid(),
        tableId,
        name: 'ru',
        description: '俄语',
        fieldType: FieldType.Locale,
      },
      {
        id: nanoid(),
        tableId,
        name: 'fr',
        description: '法文',
        fieldType: FieldType.Locale,
      },
    ]
    return await repos.columnRepository.save(initialColumns)
  }

  /**
   * 默认初始化3行数据
   * @param tableId
   */
  private async initTableRows(tableId: string): Promise<Row[]> {
    const DEFAULT_ROW_COUNT = 3
    const repos = useRepositories()
    const tmpList = new Array(DEFAULT_ROW_COUNT).fill(() => null)
    const rows: Partial<Row>[] = tmpList.map((_, index) => ({
      id: nanoid(),
      tableId,
      sortBaseTable: index + 1,
    }))

    return await repos.rowRepository.save(rows)
  }

  private async initTableCells(tableId: string, columns: Column[], rows: Row[]): Promise<Cell[]> {
    const repos = useRepositories()
    const cellDatas = rows.reduce<Partial<Cell>[]>((result, row) => {
      const cells: Partial<Cell>[] = columns.map((column) => ({
        id: nanoid(),
        tableId,
        columnId: column.id,
        rowId: row.id,
        fieldType: column.fieldType,
      }))
      return [...result, ...cells]
    }, [])

    return await repos.cellRepository.save(cellDatas)
  }
  async initViewColumns(tableId: string, viewId: string, columns: Column[]) {
    const DEFAULT_WIDTH = 180
    const repos = useRepositories()

    const viewColumns = columns.map<Partial<ViewColumn>>((column, index) => ({
      id: nanoid(),
      tableId,
      viewId,
      columnId: column.id,
      width: DEFAULT_WIDTH,
      sortBaseView: index + 1,
    }))

    return await repos.viewColumnRepository.save(viewColumns)
  }

  async initTableData(tableId: string, viewId: string) {
    const [columns, rows] = await Promise.all([
      this.initTableColumns(tableId),
      this.initTableRows(tableId),
    ])

    await Promise.all([
      this.initViewColumns(tableId, viewId, columns),
      this.initTableCells(tableId, columns, rows),
    ])
  }

  async addTable(params: AddTableInput): Promise<[Table, View]> {
    const repos = useRepositories()
    const sort = await this.getMaxTableSortWithRepos(params.teamId)

    const table = await repos.tableRepository.save({
      sortBaseTeam: sort + 1,
      creatorId: params.userId,
      ...params,
    })

    /** 创建视图 */
    const view = await repos.viewRepository.save({
      id: nanoid(),
      sortBaseTable: 1,
      tableId: table.id,
      name: '表格',
      type: ViewType.Grid,
    } as View)

    await Promise.all([
      /** 初始化行、列(包括view列)、单元格 */
      this.initTableData(table.id, view.id),

      repos.tableRepository.update(table.id, {
        lastVisitedViewId: view.id,
      }),
    ])

    return [
      {
        ...table,
        lastVisitedViewId: view.id,
      },
      view,
    ]
  }

  async removeTable(params: RemoveTableInput): Promise<boolean> {
    const { id: tableId } = params
    const repos = useRepositories()
    const table = await repos.tableRepository.findOneOrFail(tableId)
    await repos.tableRepository.softDelete(tableId)

    const newTable = await repos.tableRepository.findOneOrFail(
      { teamId: table.teamId },
      { order: { sortBaseTeam: 'ASC' } },
    )

    const newView = await repos.viewRepository.findOneOrFail(
      { tableId: newTable.id },
      { order: { sortBaseTable: 'ASC' } },
    )

    await Promise.all([
      repos.tableRepository.update(newTable.id, {
        lastVisitedViewId: newView.id,
      }),
    ])

    return true
  }

  async setAsLastVisited(params: SetAsLastVisitedInput): Promise<boolean> {
    params
    return true
  }
}
