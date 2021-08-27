import { Injectable } from '@tiejs/common'
import { Version } from '@generated/entities'
import { AddVersionInput } from './version.input'
import { useRepositories } from '@shared/als'

@Injectable()
export class VersionService {
  constructor() {}

  async addVersion(params: AddVersionInput): Promise<Version> {
    const repos = useRepositories()
    const { tableId } = params
    const [columns, rows, cells] = await Promise.all([
      repos.columnRepository.find({ tableId }),
      repos.rowRepository.find({ tableId }),
      repos.cellRepository.find({ tableId }),
    ])
    const count = await repos.versionRepository.count({ tableId })

    const version = await repos.versionRepository.save({
      ...params,
      index: count + 1,
      sortBaseTable: count + 1,
    })
    const { id: versionId } = version

    const versonedColumns = columns.map((item) => ({ ...item, versionId }))
    const versonedRows = rows.map((item) => ({ ...item, versionId }))
    const versonedCells = cells.map((item) => ({ ...item, versionId }))
    await Promise.all([
      repos.versionedColumnRepository.save(versonedColumns),
      repos.versionedRowRepository.save(versonedRows),
      repos.versionedCellRepository.save(versonedCells),
    ])

    return version
  }
}
