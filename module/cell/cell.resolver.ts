import { Resolver, FieldResolver, Root, Mutation, Arg } from 'type-graphql'
import { CellService } from './cell.service'
import { Cell } from '@module/cell/cell.entity'
import { Option, User } from '@generated/entities'
import { FieldType } from '@shared/enum/field-type.enum'
import { ModifyCellInput } from './cell.input'
import { AbilityService } from '@ability/ability.service'
import { Action } from '@shared/enum/action.enum'
import { Injectable } from '@tiejs/common'

const optionTypes = [FieldType.SingleSelect]

@Injectable()
@Resolver(() => Cell)
export class CellResolver {
  constructor(private cellService: CellService, private abilityService: AbilityService) {}

  @FieldResolver(() => [Option], { description: '该单元格的 options' })
  async options(@Root() cell: Cell): Promise<any> {
    if (!cell.data) return []
    if (!optionTypes.includes(cell.fieldType)) return []
    return await this.cellService.cellOptionsLoader.load(cell.data)
  }

  @Mutation(() => Boolean, { description: '更新单元格' })
  async modifyCell(@Arg('input') input: ModifyCellInput): Promise<boolean> {
    const ability = await this.abilityService.createForUser({} as User)

    console.log('---:', ability.can(Action.Manage, 'all'))
    console.log('---:', ability.can(Action.Read, 'all'))

    await this.cellService.modifyCell(input)
    return true
  }
}
