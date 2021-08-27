import { Project } from 'ts-morph'
import path from 'path'
import { capital } from 'case'
import saveSourceFile from '../utils/save-source-file'
import { Option } from '../types'

const fileMiddle = 'type'

export async function generateType(name: string, options: Option) {
  const { baseDirPath = process.cwd() } = options
  const Name = capital(name, '')
  const project = new Project()
  const filePath = path.resolve(baseDirPath, 'generated', name, `${name}.${fileMiddle}.ts`)

  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  })

  // import type-graphql
  sourceFile.addImportDeclarations([
    { moduleSpecifier: 'type-graphql', namedImports: ['Field', 'ObjectType', 'Int'] },
  ])

  // import model
  sourceFile.addImportDeclaration({
    moduleSpecifier: '@generated/entities',
    namedImports: [Name],
  })

  sourceFile.addClass({
    name: `${Name}Aggregate`,
    isExported: true,
    decorators: [
      {
        name: 'ObjectType',
        arguments: [`{ description: '聚合查询' }`],
      },
    ],
    properties: [
      {
        name: 'count',
        type: 'number',
        decorators: [
          {
            name: 'Field',
            arguments: [`() => Int, { description: '总数' }`],
          },
        ],
      },
    ],
  })

  sourceFile.addClass({
    name: `${Name}sConnection`,
    isExported: true,
    decorators: [
      {
        name: 'ObjectType',
        arguments: [`{ description: 'connection' }`],
      },
    ],
    properties: [
      {
        name: 'items',
        type: `${Name}[]`,
        decorators: [
          {
            name: 'Field',
            arguments: [`() => [${Name}]`],
          },
        ],
      },
      {
        name: 'totalCount',
        type: 'number',
        decorators: [
          {
            name: 'Field',
            arguments: [`() => Int`],
          },
        ],
      },

      {
        name: 'hasNextPage',
        type: 'boolean',
        decorators: [
          {
            name: 'Field',
            arguments: [`() => Boolean`],
          },
        ],
      },
    ],
  })

  await saveSourceFile(sourceFile)
}
