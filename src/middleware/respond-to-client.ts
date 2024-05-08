/**
* @desc Attach response to client function koa application context
* @param object $app - koa application
* @return void
*/
import Koa from 'koa';
import { RespondToClient } from '../types/system';

interface RespondToClientResponse {
  statusCode: number;
  body: RespondToClient | string | undefined;
}

const respondToClient = (ctx:Koa.Context, status:number=200, data: RespondToClient|string|null=null) => {

  const body:RespondToClientResponse = {
    statusCode:  status,
    body: data ? data : undefined,
  }

  ctx.status = status;
  ctx.body = body;
}

export default (app:Koa) => {
  app.context.respondToClient = respondToClient
  return (ctx:Koa.Context, next: () => Promise<any>) => next()
}
