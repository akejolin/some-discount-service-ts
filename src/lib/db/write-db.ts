/**
* @desc write file to disk.
* @param string $dirName - name of dir,
* @param string $fileName - name of file,
* @param * $data - the data to be written,
* @return void
*/



import path from 'path';
import * as fs from 'fs';

export default <T>(dirName:string, fileName:string, data:T) => new Promise<void>(async (resolve) => {
  const diskPath = path.resolve('.', dirName)
  const filePath = `${diskPath}/${fileName}`

  fs.writeFile(filePath, JSON.stringify(data), (err:any) => {
    if (err) {
        throw new Error(err)
    }
    resolve()
  })
})

