import { SourceFile } from 'ts-morph'
import { capital, kebab, camel } from 'case'

/**
 * 导入 GraphQL 相关的 type、args、input
 * @param sourceFile
 * @param moduleDir
 * @param name
 */
export function importShared(
  sourceFile: SourceFile,
  moduleDir: string,
  name: string,
  excludes: string[] = [],
  isRepo = false,
  enableSort = false,
) {
  const Name = capital(name, '')

  // import model
  sourceFile.addImportDeclaration({
    moduleSpecifier: '@generated/entities',
    namedImports: [Name],
  })

  // import type
  const types: any[] = []
  if (!isRepo) {
    types.push(`${Name}sConnection`)
  }
  types.push(`${Name}Aggregate`)
  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${kebab(name)}.type`,
    namedImports: types,
  })

  // import input from project
  const inputs: any[] = []
  if (!isRepo) {
    inputs.push(`Create${Name}Input`)
    inputs.push(`Delete${Name}Input`)
  }
  sourceFile.addImportDeclaration({
    moduleSpecifier: `${moduleDir}/${kebab(name)}.input`,
    namedImports: inputs.filter((i) => !excludes.includes(camel(i).replace('Input', ''))),
  })

  // import input from generated
  const innerInputs: string[] = [
    `Update${Name}Input`,
    `UpdateMany${Name}Input`,
    `Upsert${Name}Input`,
  ].filter((i) => !excludes.includes(camel(i).replace('Input', '')))

  if (enableSort) {
    innerInputs.push(`Sort${Name}sInput`)
  }

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${kebab(name)}.input`,
    namedImports: innerInputs,
  })

  // import args from project
  if (!isRepo) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: `${moduleDir}/${kebab(name)}.args`,
      namedImports: [`Query${Name}Args`],
    })
  }

  // import args from generated
  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${kebab(name)}.args`,
    namedImports: [`Query${Name}sArgs`, `${Name}AggregateArgs`],
  })
}
