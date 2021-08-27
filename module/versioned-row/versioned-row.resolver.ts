import { Resolver } from 'type-graphql'
import { Injectable } from '@tiejs/common'
import { VersionedRow } from './versioned-row.entity'

@Injectable()
@Resolver(() => VersionedRow)
export class VersionedRowResolver {
  constructor() {}
}
