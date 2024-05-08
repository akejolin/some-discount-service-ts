/**
* @desc Test function that reads a file and import data
*/

import shell from 'shelljs';
import createDB from './create-db';
import readDB from './read-db';
import path from 'path';

import {User} from '../../types/dataTypes';

const diskPath = path.resolve('.', 'mock')

const user:User = {
  id:0,
  username: 'testy',
  email: 'test.testsson@testy.com',
  password: 'abc123',
}

beforeEach(() => {
  createDB('mock', 'test-db.json', [user])
});
afterEach(() => {
  shell.rm('-fr', diskPath)
});

describe('readDB', () => {
  it('should read some data from a file on disk', async () => {
    const data = await readDB('mock', 'test-db.json')
    expect(data).toEqual([user])
  })
})





