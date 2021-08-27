import { kebab } from 'case'
import { generateResolver } from './generator/resolver'
import { generateRepository } from './generator/repository'
import { generateService } from './generator/service'
import { generateType } from './generator/type'
import { generateArgs } from './generator/args'
import { generateInput } from './generator/input'
import { generateEntityClass } from './generator/entity-class'
import { CrudConfig } from './types'

export { generateResolver, generateRepository, generateService, generateEntityClass }

export async function generateCrud(config: CrudConfig) {
  const crudConfig = Object.keys(config).map((key) => ({
    entity: kebab(key),
    ...config[key],
  }))

  const promises = crudConfig.reduce((result, item) => {
    result = [
      ...result,
      generateArgs(item.entity, item),
      generateInput(item.entity, item),
      generateType(item.entity, item),
      generateRepository(item.entity, item),
      generateService(item.entity, item),
      generateResolver(item.entity, item),
    ]
    return result
  }, [] as Promise<void>[])

  await Promise.all(promises)
}
