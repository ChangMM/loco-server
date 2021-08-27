import { Resolver } from 'type-graphql'
// import { FieldType } from '@shared/enum/field-type.enum'
import { VersionedCell } from './versioned-cell.entity'
// import { VersionedCellService } from './versioned-cell.service'
import { Injectable } from '@tiejs/common'

// const optionTypes = [FieldType.SingleSelect]

@Injectable()
@Resolver(() => VersionedCell)
export class VersionedCellResolver {
  // constructor(private versionedCellService: VersionedCellService) {}
  // @FieldResolver(() => [Option], { description: '该单元格的 options' })
  // async options(@Root() cell: VersionedCell): Promise<any> {
  //   cell
  //   if (!cell.data) return []
  //   if (!optionTypes.includes(cell.fieldType)) return []
  //   return await this.versionedCellService.cellOptionsLoader.load(cell.data)
  // }
}
