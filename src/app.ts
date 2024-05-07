import Koa from 'koa';
import * as HttpStatus from 'http-status-codes';

import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import RespondToClient from './middleware/respond-to-client';
import authJwt from './middleware/auth-jwt';
import router from './routes/router';
import userModel from './models/user';
import {DbBase, Model} from './types/dataTypes'
import createDB from './lib/db/create-db'


const app:Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error:any) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// Init db models

[userModel].forEach((item: Model) => {
  const initData:DbBase[] = [item.model] || [];
  createDB('db', `${item.name}.json`, initData)
})

// Todo: move this to auth-jwt middleware
app.context.setToken = (_token: string) => {
  app.context.token = _token
}
app.context.setUserId = (id: string) => {
  app.context.userId = id
}

app.use(bodyParser())
app.use(RespondToClient(app));
//app.use(authJwt);
app.use(router.routes());


// Application error logging.
app.on('error', console.error);

export default app;