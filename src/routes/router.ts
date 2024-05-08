/**
* @desc Route middleware.
*/
import Router from 'koa-router';
import Koa from 'koa';

import controllerLogin from '../controllers/login';
import controllerGetCode from '../controllers/get-code';
import controllerUseCode from '../controllers/use-code';

import controllerGenerateCode from '../controllers/generate-codes';

const router = new Router()

router.put('/generate-code', async (ctx:Koa.Context, next: () => Promise<any>) => {
  await controllerGenerateCode(ctx);
  await next();
})

// Todo: remove this. This is for testing purpose
router.get('/generate-code', async (ctx:Koa.Context, next: () => Promise<any>) => {
  await controllerGenerateCode(ctx);
  await next();
})


router.put('/get-code', async (ctx:Koa.Context, next: () => Promise<any>) => {
  await controllerGetCode(ctx);
  await next();
})

// Todo: remove this. This is for testing purpose
router.get('/get-code', async (ctx:Koa.Context, next: () => Promise<any>) => {
  await controllerGetCode(ctx);
  await next();
})

router.put('/use-code', async (ctx:Koa.Context, next: () => Promise<any>) => {
  await controllerUseCode(ctx);
  await next();
})

// Todo: remove this. This is for testing purpose
router.get('/use-code', async (ctx:Koa.Context, next: () => Promise<any>) => {
  await controllerUseCode(ctx);
  await next();
})


// Todo: remove this. This is for testing purpose
router.get('/login', async (ctx:Koa.Context, next: () => Promise<any>) => {
  await controllerLogin(ctx)
  await next()
})

export default router