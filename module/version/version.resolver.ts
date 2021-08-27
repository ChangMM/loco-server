import { Arg, Mutation, Resolver } from 'type-graphql'
import { VersionService } from './version.service'
import { Version } from '@generated/entities'
import { Injectable } from '@tiejs/common'
import { AddVersionInput } from './version.input'
import { Transactional } from '@shared/als'

@Injectable()
@Resolver(() => Version)
export class VersionResolver {
  constructor(private versionService: VersionService) {}

  @Mutation(() => Version, { description: '新增版本' })
  @Transactional()
  async addVersion(@Arg('input') input: AddVersionInput): Promise<Version> {
    return await this.versionService.addVersion(input)
  }
}
