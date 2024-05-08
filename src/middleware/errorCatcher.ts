/**
* @desc Error catcher  - Catches all errors that occures within the app
* @return function - middleware
*/

import Koa from 'koa';

export default async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error:any) {
    ctx.status = error.statusCode || error.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
}