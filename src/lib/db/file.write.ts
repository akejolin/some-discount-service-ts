/**
* @desc write to txt file on disk
* @param string $file - full file path on disk,
* @return void
*/

import * as fs from 'fs';

export default (file:string, data:string) => fs.writeFile(file, data, (err) => {
  if (err) {
      throw new Error(err as any)
  }
})