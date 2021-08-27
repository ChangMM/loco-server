import { Project, OptionalKind, MethodDeclarationStructure } from 'ts-morph'
import path from 'path'
import { capital, kebab, camel } from 'case'
import saveSourceFile from '../utils/save-source-file'
import { Option, Relation, RelationType } from '../types'
import { importShared } from '../utils/import-shared'

export async function generateRepository(entity: string, options: Option) {
  const { baseDirPath = process.cwd(), relations = [], moduleDir = `@module/${entity}` } = options
  const Entity = capital(entity, '')
  const camelEntity = camel(entity)
  const project = new Project()
  const filePath = path.resolve(baseDirPath, 'generated', entity, `${kebab(entity)}.repository.ts`)
  const relationEntity: string[] = []
  const relationsSetByEntity: Relation[] = []

  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  })

  // repository 方法
  const methodTypes = [
    {
      name: 'findMany',
      paramType: `Query${Entity}sArgs`,
      returnType: `Promise<${Entity}[]>`,
      statments: `
        const findOption = handleArgs(params)
        return await this.find(findOption)
      `,
    },

    {
      name: 'aggregate',
      paramType: `${Entity}AggregateArgs`,
      returnType: `Promise<${Entity}Aggregate>`,
      statments: `

        const {where} = params || {}
        return {
          count: await this.count(where as any),
        }
      `,
    },

    {
      name: 'updateOne',
      paramType: `Update${Entity}Input`,
      returnType: `Promise<${Entity}>`,
      statments: `const { where = {}, data = {} } = params
        const result = await this.findOne({...where} as any)
        if (!result) throw new Exception({
          code: '${Entity}ForUpdateNotExist',
          message: '未找到要更新的对象${Entity}',
          type: 'ObjectNotExist',
        })

        await this.update({...where}, {...data})

        // 是否需要重新查数据库？
        return { ...result, ...data }
      `,
    },

    {
      name: 'updateMany',
      paramType: `UpdateMany${Entity}Input`,
      returnType: `Promise<boolean>`,
      statments: `const { where = {}, data = {} } = params

        await this.update({...where}, {...data})
        return true

      `,
    },

    {
      name: 'upsert',
      paramType: `Upsert${Entity}Input`,
      returnType: `Promise<${Entity}>`,
      statments: `
        const { where, update, create } = params
        try {
          await this.findOne({...where} as any)
          return await this.updateOne({ where:{...where}, data: update })
        } catch (error) {
          // TODO: handle any
          return await this.save(create as any)
        }
      `,
    },
  ]

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
    { moduleSpecifier: '@tiejs/exception', namedImports: ['Exception'] },
    { moduleSpecifier: '@tiejs/common', namedImports: ['Injectable'] },
    { moduleSpecifier: '@shared/tie-graphql-crud/handleArgs', namedImports: ['handleArgs'] },

    {
      moduleSpecifier: 'typeorm',
      namedImports: [
        'EntityRepository',
        'Repository',
        // 'Brackets',
        // 'Not',
        ...(relations.length ? ['getRepository', 'In'] : []),
      ],
    },
  ])

  // import dataLoader
  if (relations.length) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: 'dataloader',
      defaultImport: 'DataLoader',
    })
  }

  importShared(sourceFile, moduleDir, entity, [], true)

  for (const relation of relations) {
    const { targetEntity: entityName, type } = relation
    const EntityName = capital(entityName, '')
    if (relationEntity.indexOf(entityName) >= 0) continue
    relationEntity.push(entityName)
    relationsSetByEntity.push(relation)
    if (camelEntity !== entityName && type !== RelationType.ManyToMany) {
      sourceFile.addImportDeclaration({
        moduleSpecifier: '@generated/entities',
        namedImports: [EntityName],
      })
    }
  }

  sourceFile.addClass({
    name: `${Entity}Repository`,
    extends: `Repository<${Entity}>`,
    isExported: true,
    decorators: [
      {
        name: 'Injectable',
        arguments: [],
      },
      {
        name: 'EntityRepository',
        arguments: [`${Entity}`],
      },
    ],
    methods: [
      /** 处理 fieldResolver */
      ...relationsSetByEntity.map((relation) => {
        let statements = ''
        const { targetEntity, targetKey, joinFindOption } = relation

        const EntityName = capital(targetEntity, '')
        const entityName = camel(targetEntity)
        let findOption = { where: { [targetKey]: `In(keys as any)` as any } } as any

        if (joinFindOption && joinFindOption.where)
          findOption = {
            where: {
              ...findOption.where,
              ...joinFindOption.where,
            },
          }
        if (joinFindOption && joinFindOption.select)
          findOption = {
            ...findOption,
            select: joinFindOption.select,
          }
        if (joinFindOption && joinFindOption.order)
          findOption = {
            ...findOption,
            order: JSON.stringify(joinFindOption.order),
          }
        const findOptionStr = parseStr(findOption)

        switch (relation.type) {
          case 'ManyToMany':
            statements = `
              return new DataLoader(keys => {
                // this.${entityName}Loader.clearAll() // TODO
                return new Promise((resolve, reject) => {
                  getRepository(${Entity})
                    .find({ relations: ['${entityName}s'], where: { id: In(keys as any) } })
                    .then(data => {
                      const result: any = keys.map(k => {
                        const find: any = data.find(d => d.id == k)
                        return find.${entityName}s
                      })
                      resolve((result as any) || [])
                    })
                    .catch(e => {
                      reject(e)
                    })
                })
              })
            `
            break

          case 'OneToMany':
            statements = `
              return new DataLoader(keys => {
                // this.${entityName}Loader.clearAll() // TODO
                return new Promise((resolve, reject) => {
                  getRepository(${EntityName})
                    .find(${findOptionStr})
                    .then(data => {
                      const filterData = keys.map(k => data.filter((d:any) => d.${targetKey} === k))
                      resolve(filterData as any)
                    })
                    .catch(e => {
                      reject(e)
                    })
                })
              })
            `
            break

          case 'ManyToOne':
            statements = `
              return new DataLoader(keys => {
                // this.${entityName}Loader.clearAll() // TODO
                return new Promise((resolve, reject) => {
                  getRepository(${EntityName})
                    .find(${findOptionStr})
                    .then(data => {
                      const filterData = keys.map(k => data.find((d:any) => d.${targetKey} === k))
                      resolve(filterData as any)
                    })
                    .catch(e => {
                      reject(e)
                    })
                })
              })
            `
            break

          case 'OneToOne':
            statements = `
              return new DataLoader(keys => {
                // this.${entityName}Loader.clearAll() // TODO
                return new Promise((resolve, reject) => {
                  getRepository(${EntityName})
                    .find(${findOptionStr})
                    .then(data => {
                      const filterData = keys.map(k => data.find((d:any) => d.${targetKey} === k))
                      resolve(filterData as any)
                    })
                    .catch(e => {
                      reject(e)
                    })
                })
              })
            `
            break
        }

        return {
          name: `get${capital(entityName, '')}Loader`,
          parameters: [
            {
              name: '__self',
              type: 'any = {}',
            },
          ],
          statements: statements,
        }
      }),

      ...methods,

      {
        name: 'createOrUpdate',
        isAsync: true,
        parameters: [
          {
            name: 'input',
            type: 'any',
          },
          {
            name: 'overwrite?',
            type: 'string[]',
          },
        ],
        returnType: `Promise<${Entity}>`,
        statements: `

        try {
          const payload = await this.createQueryBuilder()
            .insert()
            .into(${Entity})
            .orUpdate({ overwrite })
            .values(input)
            .execute()
          if (payload) return (payload as unknown) as ${Entity}
          throw new Exception({
            code: '${Entity}CreateFail',
            message: '${Entity}创建失败',
            type: 'ObjectCreateFail',
          })
        } catch (error) {
          throw new Exception({
            code: 'DbError',
            message: '数据库操作错误',
            type: 'DbError',
            status: 500,
          })
        }
        `,
      },
    ],
  })

  await saveSourceFile(sourceFile)
}

function parseStr(findOption: any) {
  let str = '{'
  if (findOption.hasOwnProperty('where')) {
    str += 'where : {place},'
    let place = ''
    for (const key in findOption['where']) {
      if (findOption['where'].hasOwnProperty(key)) {
        const element = findOption['where'][key]
        place += `${key} : ${element}, `
      }
    }
    str = str.replace('place', place)
  }

  if (findOption.hasOwnProperty('select')) {
    const select = findOption['select']
    str += `select : [place], `
    let place = ''
    for (const value of select) {
      place += `'${value}',`
    }
    str = str.replace('place', place)
  }

  if (findOption.hasOwnProperty('order')) {
    const order = findOption['order']
    str += `order : ${order} `
  }

  str += '}'

  return str
}
