import Koa from 'koa';
import * as HttpStatus from 'http-status-codes';
import bodyParser from 'koa-bodyparser';
import errorCatcher from './middleware/errorCatcher';
import RespondToClient from './middleware/respond-to-client';
import authJwt from './middleware/auth-jwt';
import router from './routes/router';
import userModel from './models/user';
import codeModel from './models/code';
import userCodeModel from './models/user-code';
import {DbBase, Model} from './types/dataTypes'
import createDB from './lib/db/create-db'
import randomErrors from './middleware/randomErrors';

// Create App
const app:Koa = new Koa();

// Generic error handling middleware.
app.use(errorCatcher);

// Init db models
[userModel, codeModel, userCodeModel].forEach((item: Model) => {
  const initData:DbBase[] = [item.model] || [];
  createDB('database', `${item.name}.json`, initData)
})

// Add Middlewares
app.use(errorCatcher);
app.use(authJwt(app));
app.use(bodyParser())
app.use(RespondToClient(app));
app.use(router.routes());
app.use(randomErrors);

// Application error logging.
app.on('error', console.error);

// Export for testing activities
export default app;
