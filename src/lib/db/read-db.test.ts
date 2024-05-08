/**
* @desc Test function that reads a file and import data
*/

import shell from 'shelljs';
import createDB from './create-db';
import readDB from './read-db';
import path from 'path';

import {User} from '../../types/dataTypes';
import fileWrite from './file.write';
import {DbError} from '../errors';

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
  });

  it('should read some data from a file on disk', async () => {
    const data = await readDB('mock', 'test-db.json')
    expect(data).toEqual([user])
  });

  it('should throw if file on disk contains broken data', async () => {
    await fileWrite(`${diskPath}/test-db.json`, '{some-broken-json');
    try {
      await readDB('mock', 'test-db.json');;
    } catch (error) {
      expect(error).toEqual(new DbError('JSON_PARSE_ERROR'));
    }
  })
  it('should throw if file on disk does not exist', async () => {
    try {
      await readDB('mock', 'i-dont-exist.json');
    } catch (error) {
      expect(error).toEqual(new DbError('FILE_READ_ERROR'));
    }
  })
})





