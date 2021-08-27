import { Resolver } from 'type-graphql'
import { Injectable } from '@tiejs/common'
import { VersionedColumn } from './versioned-column.entity'

@Injectable()
@Resolver(() => VersionedColumn)
export class VersionedColumnResolver {
  constructor() {}
}
