import { Project } from 'ts-morph'
import path from 'path'
import { capital, kebab } from 'case'
import saveSourceFile from '../utils/save-source-file'
import { Option } from '../types'

export async function generateInput(name: string, options: Option) {
  const { baseDirPath = process.cwd(), moduleDir = `@module/${name}` } = options
  const Name = capital(name, '')
  const project = new Project()
  const filePath = path.resolve(baseDirPath, 'generated', name, `${name}.input.ts`)

  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  })

  // import type-graphql
  sourceFile.addImportDeclarations([
    { moduleSpecifier: 'type-graphql', namedImports: ['InputType', 'Field', 'Int'] },
  ])

  // import class-validator
  sourceFile.addImportDeclarations([
    { moduleSpecifier: 'class-validator', namedImports: ['ValidateNested'] },
  ])

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: `${moduleDir}/${kebab(name)}.input`,
      namedImports: [`Create${Name}Input`, `Update${Name}WhereInput`, `Update${Name}DataInput`],
    },
  ])

  // 更新单个
  sourceFile.addClass({
    name: `Update${Name}Input`,
    isExported: true,
    decorators: [
      {
        name: 'InputType',
        arguments: ['{ description: "更新单个" }'],
      },
    ],

    properties: [
      {
        name: 'where',
        type: `Update${Name}WhereInput`,
        decorators: [
          {
            name: 'Field',
            arguments: [
              `() => Update${Name}WhereInput`,
              `{ description: '更新条件', nullable: true }`,
            ],
          },
          {
            name: 'ValidateNested',
            arguments: [],
          },
        ],
      },
      {
        name: 'data',
        type: `Update${Name}DataInput`,
        decorators: [
          {
            name: 'Field',
            arguments: [
              `() => Update${Name}DataInput`,
              `{ description: '更新的数据', nullable: true }`,
            ],
          },
          {
            name: 'ValidateNested',
            arguments: [],
          },
        ],
      },
    ],
  })

  // 批量更新
  sourceFile.addClass({
    name: `UpdateMany${Name}Input`,
    isExported: true,
    decorators: [
      {
        name: 'InputType',
        arguments: ['{ description: "批量更新" }'],
      },
    ],

    properties: [
      {
        name: 'where',
        type: `Update${Name}WhereInput`,
        decorators: [
          {
            name: 'Field',
            arguments: [
              `() => Update${Name}WhereInput`,
              `{ description: '更新条件', nullable: true }`,
            ],
          },
          {
            name: 'ValidateNested',
            arguments: [],
          },
        ],
      },
      {
        name: 'data',
        type: `Update${Name}DataInput`,
        decorators: [
          {
            name: 'Field',
            arguments: [
              `() => Update${Name}DataInput`,
              `{ description: '更新的数据', nullable: true }`,
            ],
          },
          {
            name: 'ValidateNested',
            arguments: [],
          },
        ],
      },
    ],
  })

  // 更新或创建
  sourceFile.addClass({
    name: `Upsert${Name}Input`,
    isExported: true,
    decorators: [
      {
        name: 'InputType',
        arguments: ['{ description: "更新或创建" }'],
      },
    ],

    properties: [
      {
        name: 'where',
        type: `Update${Name}WhereInput`,
        decorators: [
          {
            name: 'Field',
            arguments: [
              `() => Update${Name}WhereInput`,
              `{ description: '更新条件', nullable: true }`,
            ],
          },
          {
            name: 'ValidateNested',
            arguments: [],
          },
        ],
      },
      {
        name: 'update',
        type: `Update${Name}DataInput`,
        decorators: [
          {
            name: 'Field',
            arguments: [
              `() => Update${Name}DataInput`,
              `{ description: '更新的数据', nullable: true }`,
            ],
          },
          {
            name: 'ValidateNested',
            arguments: [],
          },
        ],
      },

      {
        name: 'create',
        type: `Create${Name}Input`,
        decorators: [
          {
            name: 'Field',
            arguments: [
              `() => Create${Name}Input`,
              `{ description: '创建的数据', nullable: true }`,
            ],
          },
          {
            name: 'ValidateNested',
            arguments: [],
          },
        ],
      },
    ],
  })

  // 排序
  sourceFile.addClass({
    name: `Sort${Name}sInput`,
    isExported: true,
    decorators: [
      {
        name: 'InputType',
        arguments: ['{ description: "排序" }'],
      },
    ],

    properties: [
      {
        name: 'origin',
        type: 'number',
        decorators: [
          {
            name: 'Field',
            arguments: [`() => Int`, `{ description: '原始sort值'}`],
          },
        ],
      },
      {
        name: 'target',
        type: 'number',
        decorators: [
          {
            name: 'Field',
            arguments: [`() => Int`, `{ description: '目标sort值'}`],
          },
        ],
      },

      {
        name: 'baseOn',
        type: 'string',
        decorators: [
          {
            name: 'Field',
            arguments: [`{ description: '基于什么排序, 比如 flow_100', nullable: true }`],
          },
        ],
      },
    ],
  })

  await saveSourceFile(sourceFile)
}
