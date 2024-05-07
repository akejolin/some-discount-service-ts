/**
* @desc Attach response to client function koa application context
* @param object $app - koa application
* @return void
*/
import Koa from 'koa';

const respondToClient = (ctx:Koa.Context, status:number=200, data:string='') => {

  const body = {
    statusCode:  status,
    body: data,
  }

  ctx.status = status;
  ctx.body = body;
}

export default (app:Koa) => {
  app.context.respondToClient = respondToClient
  return (ctx:Koa.Context, next: () => Promise<any>) => next()
}
