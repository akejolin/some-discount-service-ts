/**
* @desc generate hash code.
* @return string - hash
*/


import readDB from './read-db';

export default <T>(haystack:string, key: keyof T, needle:string|number|boolean) => new Promise<T[]>(async (resolve) => {

  let db:T[] = []
  try {
    db = await readDB('database', haystack)
    db = Array.isArray(db) ? db.slice(): [];
  } catch(error) {
    console.info('problems to read data array from db')
    db = []
  }

  if (needle === '*') {
    resolve(db)
  }

  const target:T[] = db.filter((item:T) => item[key] === needle);
  resolve(target);
})