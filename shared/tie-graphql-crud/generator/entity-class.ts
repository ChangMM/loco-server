import { Project } from 'ts-morph'
import path from 'path'
import fs from 'fs-extra'
import saveSourceFile from '../utils/save-source-file'
import { loadEntityFiles } from '../utils/loadEntityFiles'

export async function generateEntityClass() {
  const project = new Project()
  const filePath = path.resolve(process.cwd(), 'generated', 'entities.ts')

  if (fs.existsSync(filePath)) {
    fs.removeSync(filePath)
  }

  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  })
  const files = await loadEntityFiles()

  for (const file of files) {
    sourceFile.addExportDeclaration({
      moduleSpecifier: file.replace('.ts', ''),
    })
  }

  saveSourceFile(sourceFile)
}
