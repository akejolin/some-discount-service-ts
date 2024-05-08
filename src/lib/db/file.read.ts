/**
* @desc read from txt file on disk
* @param string $file - full file path on disk,
* @return string - file content
*/

import * as fs from 'fs';

export default async (file:string) => new Promise<any>((resolve, reject) => fs.readFile(file, (err, data) => {
  if (err) {
    reject();
  }
  resolve(data)
}))
