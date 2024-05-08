
import Koa from 'koa';
import { ResponseError } from '../lib/errors';

export default async (ctx: Koa.Context, next: () => Promise<any>) => {

  switch(`${ctx.status}`) {
    case '404':
      throw new ResponseError(`Nope, that's a 404.`, 404, 'Not found.');
    case '500':
    case '501':
    case '502':
    case '503':
    case '504':
      throw new ResponseError(`We have troubles.`, parseInt(`${ctx.status}`), 'Internal Server Error.');
    }
    await next();
  }