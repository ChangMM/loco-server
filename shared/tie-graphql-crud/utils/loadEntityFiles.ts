import path from 'path'
import globby, { GlobbyOptions } from 'globby'

export async function loadEntityFiles() {
  let cwd: string = path.join(process.cwd())
  const opt: GlobbyOptions = {
    ignore: ['**/node_modules/**'],
    onlyFiles: true,
    cwd,
    absolute: true,
  }
  const paths = globby.sync('**/*.entity.ts', opt)
  return paths.map((i) => i.split(path.sep).join('/'))
}
