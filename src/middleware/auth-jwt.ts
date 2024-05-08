/**
* @desc Auth token verify
* @param object $app - koa application
* @return function - middleware
*/

import jwt from 'jsonwebtoken';
import Koa from 'koa';

export const config = {
  secret: process.env.AUTH_SECRET || "i-am-super-secret"
}

export default (app:Koa) => async (ctx:Koa.Context, next: () => Promise<any>) => {

  app.context.setToken = (_token: string) => {
    app.context.token = _token
  }
  app.context.setUserId = (id:string) => {
    app.context.userId = id
  }

  if (ctx.request.url.startsWith('/login')) {
    return await next();
  }

  let token = ctx.token || ctx.req.headers["Authorization"];
  if (!token) {
    return ctx.respondToClient(ctx, 403, `Token is missing: ${token}`);
  }

  jwt.verify(token, config.secret, async (err:any, decoded:any) => {
    if (err) {
      return  ctx.respondToClient(ctx, 401);
    }

    ctx.setUserId(decoded.id);
    ctx.setToken(token);
  })
  await next();
}