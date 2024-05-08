/**
* @desc use a discount code
* param: @object - ctx, koa context middleware object
* @return void
*/
import Koa from 'koa';
import get from 'lodash.get';
import getItemsDB from '../lib/db/get-items-db';
import getItemDB from '../lib/db/get-item-db';
import writeDB from '../lib/db/write-db';
import findLatestId from '../lib/db/find-latest-id';
import {Code, UserCode} from '../types/dataTypes'

type DiscountCodes <T> = Partial<T>
   & { isClaimed: boolean }

export default async (ctx: Koa.Context) => {

  // Collect params
  const params = {
    code: get(ctx, 'body.code', null) !== null ? get(ctx, 'body.code', null) : get(ctx, 'query.code', null),
  }

  if (params.code === '') {
    return ctx.respondToClient(ctx, 400 , `no code was provided.`)
  }




  // Select all codes
  let codes:Code[];
  codes = await getItemsDB('codes.json', 'id', '*');

  // Seach for code
  let code:Code|null;
  code = await getItemDB('codes.json', 'code', params.code);

  if (!code) {
    return ctx.respondToClient(ctx, 400 , `The code you provided is invalid.`);
  }
  if (code.isUsed) {
    return ctx.respondToClient(ctx, 400 , `The code you provided is already used.`);
  }

  // Code when valid code was provided ...

  // Update
  codes = codes.map((item) => {
    if (item.code === code.code) {
      item.isUsed = true;
    }
    return item;
  })

  // Save whole user-code relation list
  await writeDB('database', 'codes.json', codes);

  // Respond to user and finish
  return ctx.respondToClient(ctx, 200, {
    status: 'valid',
    code: code,
    message: `You have got a discount with your valid discount code.`
  })
}