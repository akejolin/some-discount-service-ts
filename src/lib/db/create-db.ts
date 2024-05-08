import path from 'path'
import * as fs from 'fs';
import shell from 'shelljs';
import fileWrite from './file.write';


export default async <T>(dir:string, fileName:string, data:T[]) => {

  if (!Array.isArray(data)) {
    throw new Error('DB_ERROR');
  }

  const diskPath = path.resolve('.', dir)
  const filePath = `${diskPath}/${fileName}`
  if (!fs.existsSync(diskPath)) {
    await shell.mkdir('-p', diskPath)
  }
  if (!fs.existsSync(filePath)) {
    await fileWrite(filePath, JSON.stringify(data))
  }
}