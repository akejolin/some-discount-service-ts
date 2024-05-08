import Koa from 'koa';
import * as HttpStatus from 'http-status-codes';
import bodyParser from 'koa-bodyparser';
import RespondToClient from './middleware/respond-to-client';
import authJwt from './middleware/auth-jwt';
import router from './routes/router';
import userModel from './models/user';
import codeModel from './models/code';
import userCodeModel from './models/user-code';
import {DbBase, Model} from './types/dataTypes'
import createDB from './lib/db/create-db'


const app:Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error:any) {
    ctx.status = error.statusCode || error.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// Init db models

[userModel, codeModel, userCodeModel].forEach((item: Model) => {
  const initData:DbBase[] = [item.model] || [];
  createDB('database', `${item.name}.json`, initData)
})

app.use(authJwt(app));
app.use(bodyParser())
app.use(RespondToClient(app));
app.use(router.routes());


// Application error logging.
app.on('error', console.error);

export default app;