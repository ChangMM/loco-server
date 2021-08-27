import { Project, OptionalKind, MethodDeclarationStructure } from 'ts-morph'
import path from 'path'
import { capital, kebab, camel } from 'case'
import saveSourceFile from '../utils/save-source-file'
import { Option, RelationType } from '../types'
import { importShared } from '../utils/import-shared'

export async function generateResolver(entity: string, options: Option) {
  const {
    baseDirPath = process.cwd(),
    excludes = [],
    moduleDir = `@module/${entity}`,
    relations = [],
    sorts = [],
  } = options
  const Entity = capital(entity, '')
  const camelEntity = camel(entity)
  const project = new Project()
  const filePath = path.resolve(baseDirPath, 'generated', entity, `${kebab(entity)}.resolver.ts`)

  type MethodType = {
    name: string
    paramName?: string
    type: 'Query' | 'Mutation' | 'FieldResolver'
    gqlType: string
    paramtype: string
    paramDecorator: 'Args' | 'Arg' | 'Root'
    returnType: string
    desc: string
    method?: string
    statements?: string
  }

  // resolver 方法
  const methodTypes: MethodType[] = [
    ...relations.map((i) => {
      const { targetEntity: relationEntityName, methodName, selfKey, type } = i
      const EntityName = capital(relationEntityName, '')
      const id = `__self.${selfKey}`

      const isArray = [RelationType.OneToMany, RelationType.ManyToMany].includes(type as any)

      return {
        name: methodName,
        paramName: '__self',
        type: 'FieldResolver',
        gqlType: isArray ? `[${EntityName}]` : `${EntityName}`,
        paramtype: `any`,
        paramDecorator: 'Root',
        returnType: `Promise<any>`,
        desc: relationEntityName,
        statements: `
          if (!${id}) return null
          return await this.${camelEntity}Repository.get${EntityName}Loader(__self).load(${id})
        `,
      } as MethodType
    }),

    {
      name: `${camelEntity}`,
      type: 'Query',
      gqlType: `${Entity}`,
      paramtype: `Query${Entity}Args`,
      paramDecorator: 'Args',
      returnType: `Promise<${Entity}>`,
      desc: '获取单个',
      method: 'findOne',
    },
    {
      name: `${camelEntity}s`,
      type: 'Query',
      gqlType: `[${Entity}]`,
      paramtype: `Query${Entity}sArgs`,
      paramDecorator: 'Args',
      returnType: `Promise<${Entity}[]>`,
      desc: '获取列表',
      method: 'findMany',
    },

    {
      name: `${camelEntity}sConnection`,
      type: 'Query',
      gqlType: `${Entity}sConnection`,
      paramtype: `Query${Entity}sArgs`,
      paramDecorator: 'Args',
      returnType: `Promise<${Entity}sConnection>`,
      desc: '获取分页列表',
      method: `get${Entity}sConnection`,
    },

    {
      name: `${camelEntity}Aggregate`,
      type: 'Query',
      gqlType: `${Entity}Aggregate`,
      paramtype: `${Entity}AggregateArgs`,
      paramDecorator: 'Args',
      returnType: `Promise<${Entity}Aggregate>`,
      desc: '聚合查询',
      method: 'aggregate',
    },

    {
      name: `create${Entity}`,
      type: 'Mutation',
      gqlType: `${Entity}`,
      paramtype: `Create${Entity}Input`,
      paramDecorator: 'Arg',
      returnType: `Promise<${Entity}>`,
      desc: '创建',
      method: 'create',
    },
    {
      name: `update${Entity}`,
      type: 'Mutation',
      gqlType: `${Entity}`,
      paramtype: `Update${Entity}Input`,
      paramDecorator: 'Arg',
      returnType: `Promise<${Entity}>`,
      desc: '更新单个',
      method: 'update',
    },

    // TODO
    {
      name: `updateMany${Entity}s`,
      type: 'Mutation',
      gqlType: 'Boolean',
      paramtype: `UpdateMany${Entity}Input`,
      paramDecorator: 'Arg',
      returnType: `Promise<boolean>`,
      desc: '批量更新',
      method: 'updateMany',
    },

    {
      name: `upsert${Entity}`,
      type: 'Mutation',
      gqlType: `${Entity}`,
      paramtype: `Upsert${Entity}Input`,
      paramDecorator: 'Arg',
      returnType: `Promise<${Entity}>`,
      desc: '更新或创建',
      method: 'upsert',
    },

    {
      name: `delete${Entity}`,
      type: 'Mutation',
      gqlType: 'Boolean',
      paramtype: `Delete${Entity}Input`,
      paramDecorator: 'Arg',
      returnType: `Promise<boolean>`,
      desc: '删除单个',
      method: 'delete',
    },

    {
      name: `deleteMany${Entity}`,
      type: 'Mutation',
      gqlType: 'Boolean',
      paramtype: `Delete${Entity}Input`,
      paramDecorator: 'Arg',
      returnType: `Promise<boolean>`,
      desc: '批量删除',
      method: 'deleteMany',
    },
  ]

  if (sorts.length) {
    methodTypes.push({
      name: `sort${Entity}s`,
      type: 'Mutation',
      gqlType: 'Boolean',
      paramtype: `Sort${Entity}sInput`,
      paramDecorator: 'Arg',
      returnType: `Promise<boolean>`,
      desc: '排序',
      method: 'sort',
    })
  }

  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  })

  const methods: OptionalKind<MethodDeclarationStructure>[] = methodTypes
    .filter((item) => !excludes.includes(item.name))
    .map(
      (i) =>
        ({
          name: i.name,
          isAsync: true,
          returnType: i.returnType,
          decorators: [
            {
              name: i.type,
              arguments: [
                `() => ${i.gqlType}`,
                `{
                        description: '${i.desc}' 
                      }`,
              ],
            },
          ],
          parameters: [
            {
              name: i.paramName || 'args',
              type: i.paramtype,
              decorators: [
                {
                  name: i.paramDecorator,
                  arguments: [i.type === 'Mutation' ? '"input"' : ''],
                },
              ],
            },
          ],
          statements:
            i.statements ||
            `
          return await this.${camelEntity}Service.${i.method}(args)
        `,
        } as OptionalKind<MethodDeclarationStructure>),
    )

  // import lib
  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: 'type-graphql',
      namedImports: [
        'Resolver',
        'Query',
        'Mutation',
        'Arg',
        'Args',
        ...(relations.length ? ['FieldResolver', 'Root'] : []),
      ],
    },
  ])

  // import service
  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${entity}.service`,
    namedImports: [`${Entity}CrudService`],
  })

  // import repository
  if (relations.length) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: `./${entity}.repository`,
      namedImports: [`${Entity}Repository`],
    })
  }

  // import injecctable
  sourceFile.addImportDeclaration({
    moduleSpecifier: '@tiejs/common',
    namedImports: ['Injectable'],
  })

  // import entity
  const names = [] as string[]
  if (relations.length) {
    for (const i of relations) {
      const { targetEntity: entityName } = i
      const EntityName = capital(entityName, '')

      if (names.indexOf(EntityName) >= 0) continue
      names.push(EntityName)

      if (EntityName !== Entity) {
        sourceFile.addImportDeclaration({
          moduleSpecifier: '@generated/entities',
          namedImports: [EntityName],
        })
      }
    }
  }

  importShared(sourceFile, moduleDir, entity, excludes, false, !!sorts.length)

  sourceFile.addClass({
    name: `${Entity}CrudResolver`,
    isExported: true,
    decorators: [
      {
        name: 'Injectable',
        arguments: [],
      },
      {
        name: 'Resolver',
        arguments: [`() => ${Entity}`],
      },
    ],
    methods: [
      {
        name: 'constructor',
        parameters: [
          {
            name: `private ${camelEntity}Service`,
            type: `${Entity}CrudService`,
          },

          ...(relations.length
            ? [
                {
                  name: `private ${camelEntity}Repository`,
                  type: `${Entity}Repository`,
                },
              ]
            : []),
        ],
      },
      ...methods,
    ],
  })

  await saveSourceFile(sourceFile)
}
