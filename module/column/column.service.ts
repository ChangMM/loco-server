import { CellRepository } from '@generated/cell/cell.repository'
import { ColumnRepository } from '@generated/column/column.repository'
import { ViewColumnRepository } from '@generated/view-column/view-column.repository'
import { Injectable } from '@tiejs/common'
import { ViewColumnService } from '@module/view-column/view-column.service'
import { AddColumnInput, ModifyColumnInput, RemoveColumnInput } from './column.input'
import { Cell, Column, ViewColumn } from '@generated/entities'
import { nanoid } from 'nanoid'
import { useRepositories } from '@shared/als'
import { fieldTypeMaps } from '@shared/constants'
import { FieldType } from '@shared/enum/field-type.enum'

@Injectable()
export class ColumnService {
  constructor(
    private viewColumnService: ViewColumnService,
    private columnRepository: ColumnRepository,
    private viewColumnRepository: ViewColumnRepository,
    private cellRepository: CellRepository,
  ) {}

  private transformCellData(data: any, oldFieldType: FieldType, newFieldType: FieldType) {
    if (!data) return null
    const dataObj = JSON.parse(data)
    const value = dataObj.value
    const map = new Map<string, any>([
      ['string->number', () => (Number.isNaN(parseFloat(value)) ? null : parseFloat(value))],
      ['string->boolean', () => null],
      ['string->array', () => null],
      ['number->string', () => String(value)],
      ['boolean->string', () => String(value)],
      ['array->string', () => String(value)],
      ['number->boolean', () => (value === 1 ? true : null)],
      ['array->boolean', () => null],
      ['number->array', () => null],
      ['boolean->array', () => null],
      ['boolean->number', () => null],
      ['array->number', () => null],
    ])

    const fn = map.get(`${fieldTypeMaps[oldFieldType]}->${fieldTypeMaps[newFieldType]}`)
    if (fn) return JSON.stringify({ value: fn() })
    return null
  }

  async addColumn(params: AddColumnInput): Promise<Column> {
    const repos = useRepositories()
    const { tableId, config = {} } = params
    const DEFAULT_WIDTH = 180

    const [column, rows] = await Promise.all([
      repos.columnRepository.save({
        ...params,
        config: JSON.stringify(config),
      }),
      repos.rowRepository.find({ tableId }),
    ])

    /** add view colummn */
    const views = await repos.viewRepository.find({ tableId })

    // TODO: 这里的查询需要事务不?
    const sort = await this.viewColumnService.getMaxViewColumnSort(views[0].id)

    // 根据 view 的数量添加 viewColumns
    const viewColumns = views.map(
      (view) =>
        ({
          id: nanoid(),
          tableId,
          viewId: view.id,
          columnId: column.id,
          width: DEFAULT_WIDTH,
          sortBaseView: sort + 1,
        } as ViewColumn),
    )

    await repos.viewColumnRepository.save(viewColumns)

    if (!rows.length) return column // 一行数据都没有，不用增加单元格

    const cellDatas: Partial<Cell>[] = rows.map((row) => ({
      id: nanoid(),
      tableId,
      columnId: column.id,
      rowId: row.id,
      fieldType: column.fieldType,
    }))

    await repos.cellRepository.save(cellDatas)

    return column
  }

  async romveColumn(input: RemoveColumnInput): Promise<boolean> {
    const { id: columnId } = input
    await Promise.all([
      this.columnRepository.softDelete(columnId),
      this.viewColumnRepository.softDelete({ columnId }),
      this.cellRepository.softDelete({ columnId }),
    ])

    return true
  }

  async modifyColumn(input: ModifyColumnInput): Promise<boolean> {
    const repos = useRepositories()
    const { id, config, ...rest } = input
    const fieldType = input.fieldType
    const column = await repos.columnRepository.findOneOrFail(id)
    let promises = [
      repos.columnRepository.update(id, {
        ...rest,
        config: JSON.stringify(config) as any,
      }),
    ]

    /** 没传 fieldType，只需修改列信息 */
    if (!fieldType) {
      await Promise.all(promises)
      return true
    }

    /** 前后 fieldType 相同，只需修改列信息 */
    if (column.fieldType === fieldType) {
      await Promise.all(promises)
      return true
    }

    /** 前后 fieldType 相同，只需修改列信息和单元格类型 */
    if (fieldTypeMaps[column.fieldType] === fieldTypeMaps[fieldType]) {
      const cellUpdater = repos.cellRepository.update(
        { columnId: id },
        { fieldType: rest.fieldType },
      )
      promises.push(cellUpdater)
      await Promise.all(promises)
      return true
    }

    /**
     *  需要转换单元格数据类型
     * */
    const cells = await repos.cellRepository.find({ columnId: id })
    const cellsUpdaters = cells.map((cell) => {
      const data = this.transformCellData(cell.data, column.fieldType, fieldType)
      return repos.cellRepository.update(cell.id, { data, fieldType } as Cell)
    })

    promises = [...promises, ...cellsUpdaters]
    await Promise.all(promises)
    return true
  }
}
