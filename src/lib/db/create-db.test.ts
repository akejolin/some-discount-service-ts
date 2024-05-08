/**
* @desc Test to write cache file.
*/

import shell from 'shelljs'
import path from 'path'
import * as fs from 'fs'
import createDB from './create-db'

const diskPath = path.resolve('.', 'mock')

interface HelloWorld {
  hello: string;
}

describe('createDB', () => {

  createDB<HelloWorld>('mock', 'db-test.json', [{hello: 'world!'}]);
  it('should make sure dir exists and create a file in it', async () => {
    await fs.readFile(`${diskPath}/db-test.json`, 'utf8', (err, data) => {
      expect(data).toEqual('[{"hello":"world!"}]')
      shell.rm('-fr', diskPath)
    })
  })

})
