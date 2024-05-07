/**
* @desc Route middleware.
*/
import Router from 'koa-router';
import Koa from 'koa'

import controllerLogin from '../controllers/login'

const router = new Router()

//const controller = require('../controllers/get-code.js')

router.put('/get-code', async (ctx:Koa.Context, next: () => Promise<any>) => {
  //await controller(ctx)
  ctx.respondToClient(ctx, 200 , `Try to put something or what`);
  await next();
})

// Todo: remove this. This is for testing purpose
router.get('/get-code', async (ctx:Koa.Context, next: () => Promise<any>) => {
  ctx.respondToClient(ctx, 200, `Try to get something or what`);
  await next();
})

/*
router.post('/login', async (ctx:Koa.Context, next: () => Promise<any>) => {
  await controllerLogin(ctx)
  await next()
})
*/

// Todo: remove this. This is for testing purpose
router.get('/login', async (ctx:Koa.Context, next: () => Promise<any>) => {
  await controllerLogin(ctx)
  await next()
})

export default router