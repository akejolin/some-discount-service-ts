/**
* @desc generate hash code.
* @return string - hash
*/

import crypto, {BinaryToTextEncoding} from 'crypto';
import randomBetween from './random-between';

export default (salt:string) => new Promise<string>(async (resolve) => {

  const random = randomBetween(0,100000)
  const generateChecksum = (str:string, algorithm:string='md5', encoding:BinaryToTextEncoding='hex') => crypto
    .createHash(algorithm)
    .update(str, 'utf8')
    .digest(encoding)

  try {
    const hash = generateChecksum(`some-key-${salt}-${random}`)
    resolve(hash)
  } catch (error) {
    throw new Error(error as any)
  }
})

