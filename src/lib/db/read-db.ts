
import path from 'path'
import fileRead from './file.read'

export default async <T>(dirName: string, fileName: string) => new Promise<T>(async (resolve) => {
  const diskPath = path.resolve('.', dirName)
  const filePath = `${diskPath}/${fileName}`
  try {
    const data = await fileRead(filePath)
    resolve(JSON.parse(data))
  } catch(error) {
    throw new Error(`error reading db file: ${filePath}`)
  }
})