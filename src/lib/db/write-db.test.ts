/**
* @desc Test function that reads a file and import data
*/

import shell from 'shelljs';
import * as fs from 'fs'
import path from 'path';
import createDB from './create-db';
import writeDB from './write-db';


const diskPath = path.resolve('.', 'mock')

interface SomeData {
  id: number;
  foo: string;
}

const someData:SomeData = {
  id: 0,
  foo: 'bar',
}
const db = [someData];

beforeAll(() => {
  createDB<SomeData>('mock', 'db-test.json', db);
});
afterAll(() => {
  shell.rm('-fr', diskPath)
});

describe('writeDB', () => {
  it('should write some data to the file on disk', async () => {
    await fs.readFile(`${diskPath}/db-test.json`, 'utf8', (err, data) => {
      expect(data).toEqual('[{"id":0,"foo":"bar"}]');
    })
  });
  it('should write some data to the file on disk', async () => {
    db.push(someData);
    await writeDB<SomeData>('database', 'db-test.json', db);
    await fs.readFile(`${diskPath}/db-test.json`, 'utf8', (err, data) => {
      expect(data).toEqual('[{"id":0,"foo":"bar"},{"id":0,"foo":"bar"}]');
    })
  })
})





