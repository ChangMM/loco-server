import { Project } from 'ts-morph'
import path from 'path'
import { capital, kebab } from 'case'
import saveSourceFile from '../utils/save-source-file'
import { Option } from '../types'

export async function generateArgs(name: string, options: Option) {
  const { baseDirPath = process.cwd(), moduleDir = `@module/${name}` } = options
  const Name = capital(name, '')
  const project = new Project()
  const filePath = path.resolve(baseDirPath, 'generated', name, `${name}.args.ts`)

  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  })

  // import type-graphql
  sourceFile.addImportDeclarations([
    { moduleSpecifier: 'type-graphql', namedImports: ['ArgsType', 'Field', 'Int'] },
  ])

  // import class-validator
  sourceFile.addImportDeclarations([
    { moduleSpecifier: 'class-validator', namedImports: ['ValidateNested'] },
  ])

  sourceFile.addImportDeclarations([
    { moduleSpecifier: `${moduleDir}/${kebab(name)}.args`, namedImports: [`${Name}WhereInput`] },
  ])

  sourceFile.addClass({
    name: `Query${Name}sArgs`,
    isExported: true,
    decorators: [
      {
        name: 'ArgsType',
        arguments: [],
      },
    ],

    properties: [
      {
        name: 'skip?',
        type: 'number',
        decorators: [
          {
            name: 'Field',
            arguments: [
              `() => Int`,
              `{ defaultValue: 0, description: '跳过元素个数', nullable: true }`,
            ],
          },
        ],
      },
      {
        name: 'first?',
        type: 'number',
        decorators: [
          {
            name: 'Field',
            arguments: [
              `() => Int`,
              `{ defaultValue: 20, description: '正向查找条数', nullable: true }`,
            ],
          },
        ],
      },

      {
        name: 'last?',
        type: 'number',
        decorators: [
          {
            name: 'Field',
            arguments: [
              `() => Int`,
              `{ defaultValue: 10, description: '逆向查找条数(暂未支持)', nullable: true }`,
            ],
          },
        ],
      },

      {
        name: 'before?',
        type: 'string',
        decorators: [
          {
            name: 'Field',
            arguments: [`{ description: '游标(暂未支持)', nullable: true }`],
          },
        ],
      },

      {
        name: 'after?',
        type: 'string',
        decorators: [
          {
            name: 'Field',
            arguments: [`{ description: '游标(暂未支持)', nullable: true }`],
          },
        ],
      },

      {
        name: 'where',
        type: `${Name}WhereInput`,
        decorators: [
          {
            name: 'Field',
            arguments: [`() => ${Name}WhereInput`, `{ description: '筛选条件', nullable: true }`],
          },
          {
            name: 'ValidateNested',
            arguments: [],
          },
        ],
      },

      {
        name: 'orderBy?',
        type: 'string',
        decorators: [
          {
            name: 'Field',
            arguments: [`{ description: '排序类型, 例如：id_ASC、id_DESC', nullable: true }`],
          },
        ],
      },
    ],
  })

  sourceFile.addClass({
    name: `${Name}AggregateArgs`,
    isExported: true,
    decorators: [
      {
        name: 'ArgsType',
        arguments: [],
      },
    ],
    properties: [
      {
        name: 'where',
        type: `${Name}WhereInput`,
        decorators: [
          {
            name: 'Field',
            arguments: [`() => ${Name}WhereInput`, `{ description: '筛选条件', nullable: true }`],
          },
          {
            name: 'ValidateNested',
            arguments: [],
          },
        ],
      },
    ],
  })

  await saveSourceFile(sourceFile)
}
