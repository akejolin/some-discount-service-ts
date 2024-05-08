/**
* @desc Test function that reads a file and import data
*/

import findLatestId from './find-latest-id';
import {User} from '../../types/dataTypes';

const db:User[] = [
  {
    id:0,
    username: 'testy',
    email: 'test.testsson@testy.com',
    password: 'abc123',
  },
  {
    id:1,
    username: 'ytset',
    email: 'ytset@testy.com',
    password: '123abc',
  }
]

describe('findLatestId', () => {
  it('shall dig out latest id in db', async () => {
    // Find out next id
    let nextId = findLatestId(db);
    expect(nextId).toEqual(1);
  })
})