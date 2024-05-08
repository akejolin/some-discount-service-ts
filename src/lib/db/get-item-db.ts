/**
* @desc generate hash code.
* @return string - hash
*/
import readDB from './read-db';

export default <T>(haystack:string, key: keyof T, needle:string) => new Promise<T|null>(async (resolve) => {

  let db: T[];
  try {
    db = await readDB('database', haystack)
    db = Array.isArray(db) ? db.slice(): []
  } catch(error) {
    console.info('Error when reading DB array')
    db = []
  }
  
  const target:T|null = db.find((item:T) => item[key] === needle) || null;
  resolve(target ? target : null);

})