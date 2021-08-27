import { Project, OptionalKind, MethodDeclarationStructure } from 'ts-morph'
import path from 'path'
import { capital, kebab, camel } from 'case'
import saveSourceFile from '../utils/save-source-file'
import { Option } from '../types'
import { importShared } from '../utils/import-shared'

export async function generateService(entity: string, options: Option) {
  const { baseDirPath = process.cwd(), moduleDir = `@module/${entity}`, sorts = [] } = options
  const Entity = capital(entity, '')
  const camelEntity = camel(entity)
  const project = new Project()
  const filePath = path.resolve(baseDirPath, 'generated', entity, `${kebab(entity)}.service.ts`)

  // TODO: 生成 create 代码 ，需要重构，因为不好理解
  const code: any[] = []
  code.push('const obj: any = {')
  code.push('...params,')
  for (const i of sorts) {
    i.baseOn
      ? code.push(
          `${i.field}: (await this.${camelEntity}Repository.count({${i.baseOn}Id: params['${i.baseOn}Id'] })) + 1,`,
        )
      : code.push(`${i.field}: (await this.${camelEntity}Repository.count()) + 1,`)
  }
  code.push('}')

  const createStatments = sorts.length
    ? `
      ${code.join('\n')}
      return await this.${camelEntity}Repository.save(obj)
    `
    : `
      return await this.${camelEntity}Repository.save(params)
    `

  const deleteCodes = sorts.map((i) => {
    const { field, baseOn } = i
    if (baseOn) {
      return `
      await this.${camelEntity}Repository
        .createQueryBuilder()
        .update(${Entity})
        .set({ ${field}: () => '${field}-1' })
        .where('${field} > :${field}', { ${field}: item['${field}'] })
        .andWhere('${baseOn}Id = :id', {id: item['${baseOn}Id']})
        .execute()
    `
    }

    return `
      await this.${camelEntity}Repository
        .createQueryBuilder()
        .update(${Entity})
        .set({ ${field}: () => '${field}-1' })
        .where('${field} > :${field}', { ${field}: item['${field}'] })
        .execute()
    `
  })

  const deleteStatments = sorts.length
    ? `
     Object.keys(params).forEach(i => {
        if (i.endsWith('_in')) {
          params[i.replace('_in', '')] = In(params[i])
          delete params[i]
        }
      })
     
      // TODO: handle any
      const item = await this.${camelEntity}Repository.findOne(params as any)
      if (!item) throw new Exception({
        code: '${Entity}ForDeleteNotExist',
        message: '未找到要删除的对象${Entity}',
        type: 'ObjectNotExist',
      })

      // TODO: handle any
      const result = await this.${camelEntity}Repository.delete(params as any)

      if (!result.affected) throw new Exception({
        code: '${Entity}DeleteFail',
        message: '删除${Entity}失败',
        type: 'ObjectDeleteFail',
      })
      ${deleteCodes.join('\n')}
      return true
    `
    : `
      Object.keys(params).forEach(i => {
        if (i.endsWith('_in')) {
          params[i.replace('_in', '')] = In(params[i])
          delete params[i]
        }
      })
      const result = await this.${camelEntity}Repository.delete(params)
      if (result.affected) return true
      throw new Exception({
        code: '${Entity}DeleteFail',
        message: '删除${Entity}失败',
        type: 'ObjectDeleteFail',
      })
    `

  // service 方法
  const methodTypes = [
    {
      name: 'findOne',
      paramType: `Query${Entity}Args`,
      returnType: `Promise<${Entity}>`,
      statments: `
        const result = await this.${camelEntity}Repository.findOne(params)
        if (result) return result
        throw new Exception({
          code: '${Entity}NotExist',
          message: '未找到${Entity}对象',
          type: 'ObjectNotExist',
        })
      `,
    },
    {
      name: 'findMany',
      paramType: `Query${Entity}sArgs`,
      returnType: `Promise<${Entity}[]>`,
      statments: `
        return await this.${camelEntity}Repository.findMany(params)
      `,
    },
    {
      name: 'count',
      paramType: `${Entity}AggregateArgs`,
      returnType: `Promise<number>`,
      statments: `
        return await this.${camelEntity}Repository.count(params)
      `,
    },

    {
      name: `get${Entity}sConnection`,
      paramType: `Query${Entity}sArgs`,
      returnType: `Promise<${Entity}sConnection>`,
      statments: `
        const findOption  = handleArgs(params)
        const {take} = findOption
        const countFindOption = findOption
        delete countFindOption['take']
        delete countFindOption['skip']

        const [totalCount, items] = await Promise.all([
          this.${camelEntity}Repository.count(countFindOption),
          this.${camelEntity}Repository.find(findOption)
        ])

        return {
          items,
          hasNextPage: take === items.length,
          totalCount,
        }
      `,
    },

    {
      name: 'aggregate',
      paramType: `${Entity}AggregateArgs`,
      returnType: `Promise<${Entity}Aggregate>`,
      statments: `
        return await this.${camelEntity}Repository.aggregate(params)
      `,
    },

    {
      name: 'create',
      paramType: `Partial<Create${Entity}Input>`,
      returnType: `Promise<${Entity}>`,
      statments: createStatments,
    },

    {
      name: 'update',
      paramType: `Update${Entity}Input`,
      returnType: `Promise<${Entity}>`,
      statments: `
        const result = await this.${camelEntity}Repository.updateOne(params)
        this.emitter.emit('${camelEntity}Updated', params, result)
        return result
      `,
    },

    {
      name: 'updateMany',
      paramType: `UpdateMany${Entity}Input`,
      returnType: `Promise<boolean>`,
      statments: `
        return await this.${camelEntity}Repository.updateMany(params)
      `,
    },

    {
      name: 'upsert',
      paramType: `Upsert${Entity}Input`,
      returnType: `Promise<${Entity}>`,
      statments: `
        return await this.${camelEntity}Repository.upsert(params)
      `,
    },

    {
      name: 'delete',
      // paramType: `Delete${Entity}Input`,
      paramType: 'any',
      returnType: `Promise<boolean>`,
      statments: deleteStatments,
    },

    {
      name: 'deleteMany',
      paramType: `Delete${Entity}Input`,
      returnType: `Promise<boolean>`,
      // TODO: 没有兼容到排序
      statments: `
        // TODO: handle any
        await this.${camelEntity}Repository.delete(params as any)
        return true
      `,
    },
  ]

  if (sorts.length) {
    methodTypes.push({
      name: 'sort',
      paramType: `Sort${Entity}sInput`,
      returnType: `Promise<boolean>`,
      statments: `
        const { origin, target, baseOn = '' } = params
        let fieldName: string = ''
        let baseOnId: any = 0
        let baseOnName: string = ''

        if (!baseOn) {
          fieldName = 'sort'
        } else {
          const [name, idString] = baseOn.split('|')
          if (!name || !idString) throw Error('baseOn 参数格式不正确')
          fieldName = 'sort' + 'Base' + capital(name,'')
          const isNumReg = /^[0-9]*$/gm
          baseOnId = isNumReg.test(idString) ?  parseInt(idString, 10): idString
          baseOnName = name + 'Id'
        }

        const between = origin < target ? Between(origin, target) : Between(target, origin)
        const findOpt:any = { [fieldName]: between }
        if (baseOnName) findOpt[baseOnName] = baseOnId
        const list = await this.${camelEntity}Repository.find(findOpt)
        const find = list.find((i: any) => i[fieldName] === origin)
        if (!find) throw new Exception({
          code: 'Sort${Entity}Error',
          message: '${Entity}s排序错误',
          type: 'SortError',
        })

        const { id } = find
        const operator = origin < target ? '-1' : '+1'
        const idsCondition = (i: any) => {
          return origin < target
            ? i[fieldName] > origin && i[fieldName] <= target
            : i[fieldName] >= target && i[fieldName] < origin
        }

        // 范围更新的id
        const ids = list.reduce((ids, i) => (idsCondition(i) ? [...ids, i.id] : ids), [] as any[])

        // 范围更新 sort
        let query = this.${camelEntity}Repository
          .createQueryBuilder()
          .update(${Entity})
          .set({ [fieldName]: () => fieldName + operator })
          .where('id IN (:ids)', { ids })

        if (baseOnName) {
          query = query.andWhere(baseOnName + '=:baseOnId', {baseOnId}  )
        }

        await query.execute()

        // 把 origin 变为 target
        await this.${camelEntity}Repository.update({ id }, { [fieldName]: target })
        return true
      `,
    })
  }

  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  })

  const methods: OptionalKind<MethodDeclarationStructure>[] = methodTypes.map(
    (i) =>
      ({
        name: i.name,
        isAsync: true,
        parameters: [
          {
            name: 'params',
            type: i.paramType,
          },
        ],
        returnType: i.returnType,
        statements: i.statments,
      } as OptionalKind<MethodDeclarationStructure>),
  )

  // import lib
  sourceFile.addImportDeclarations([
    { moduleSpecifier: 'lodash', defaultImport: '_' },
    { moduleSpecifier: '@tiejs/common', namedImports: ['Injectable'] },
    { moduleSpecifier: 'eventemitter3', defaultImport: 'EventEmitter' },
    { moduleSpecifier: '@tiejs/event', namedImports: ['InjectEmitter'] },
    { moduleSpecifier: '@tiejs/exception', namedImports: ['Exception'] },
    { moduleSpecifier: '@shared/tie-graphql-crud/handleArgs', namedImports: ['handleArgs'] },

    {
      moduleSpecifier: 'typeorm',
      namedImports: sorts?.length ? ['In', 'Between'] : ['In'],
    },
  ])

  if (sorts.length) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: 'case',
      namedImports: ['capital'],
    })
  }

  // import repository
  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${entity}.repository`,
    namedImports: [`${Entity}Repository`],
  })

  importShared(sourceFile, moduleDir, entity, [], false, !!sorts.length)

  sourceFile.addClass({
    name: `${Entity}CrudService`,
    isExported: true,
    decorators: [
      {
        name: 'Injectable',
        arguments: [],
      },
    ],
    methods: [
      {
        name: 'constructor',
        parameters: [
          {
            name: '@InjectEmitter() private emitter',
            type: 'EventEmitter',
          },
          {
            name: `private ${camelEntity}Repository`,
            type: `${Entity}Repository`,
          },
        ],
      },
      ...methods,
    ],
  })

  await saveSourceFile(sourceFile)
}
