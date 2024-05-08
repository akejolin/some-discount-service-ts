
import path from 'path';
import fileRead from './file.read';
import {DbError} from '../errors';

export default async <T>(dirName: string, fileName: string) => new Promise<T[]>(async (resolve, reject) => {
  const diskPath = path.resolve('.', dirName);
  const filePath = `${diskPath}/${fileName}`

  let data:string = '';
  try {
    data = await fileRead(filePath);
  } catch(error) {
    reject(new DbError('FILE_READ_ERROR'));
  };

  try {
    resolve(JSON.parse(data));
  } catch(error) {
    reject(new DbError('JSON_PARSE_ERROR'));
  };

})