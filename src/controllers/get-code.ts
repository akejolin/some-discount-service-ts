/**
* @desc get a discount code
* param: @object - ctx, koa context middleware object
* @return void
*/
import Koa from 'koa';
import get from 'lodash.get';
import getItemsDB from '../lib/db/get-items-db';
import writeDB from '../lib/db/write-db';
import findLatestId from '../lib/db/find-latest-id';
import {Code, UserCode} from '../types/dataTypes'

type DiscountCodes <T> = Partial<T>
   & { isClaimed: boolean }

export default async (ctx: Koa.Context) => {

  // Collect params
  const params = {
    userId: get(ctx, 'body.user_id', null) !== null ? get(ctx, 'body.user_id', null) : get(ctx, 'query.user_id', null),
  }

  // Param userId validation
  if (params.userId === null) {
    return ctx.respondToClient(ctx, 400 , `user_id param is missing`)
  }

  if (params.userId === '') {
    return ctx.respondToClient(ctx, 400 , `user_id param was provided but with empty value`)
  }


  // Select all user code relations
  let userCodeRelDB:UserCode[];

  userCodeRelDB = await getItemsDB('user-code.json', 'id', '*')


  // Search for available codes
  let discountCodes: DiscountCodes<Code>[] = await getItemsDB('codes.json', 'isUsed', false)


  // Remove all used and claimed codes
  discountCodes = discountCodes.map(code => {
    const isClaimed = userCodeRelDB.find((rel) => Number(rel.codeId) === Number(code.id))
    code.isClaimed = isClaimed ? true : false
    return code
  })

  // Remove all unavailable codes
  discountCodes = discountCodes.filter(dc => !dc.isClaimed && !dc.isUsed)

  // Abort if not found
  if (discountCodes.length < 1) {
    return ctx.respondToClient(ctx, 400, 'No available codes')
  }

  // Select and claim first available code
  const checkForFirstAvailable = discountCodes.find((dc) => !dc.isClaimed && !dc.isUsed)
  let claimedCode
  if (checkForFirstAvailable) {
    claimedCode = checkForFirstAvailable
  } else {
    return ctx.respondToClient(ctx, 400, 'No claimed discountCodes found')
  }

  // ** Time to update DB **

  // Find out next id for updating
  let nextId = userCodeRelDB.length > 0 ? findLatestId(userCodeRelDB) + 1 : 0

  // Create relation
  userCodeRelDB.push({
    id: nextId,
    codeId: Number(claimedCode.id),
    userId: Number(params.userId),
  })

  // Save whole user-code relation list
  await writeDB('database', 'user-code.json', userCodeRelDB)

  // Respond to user and finish
  return ctx.respondToClient(ctx, 200, {
    status: 'valid',
    code: claimedCode.code,
    message: `You have got a code to use for a discount on a purchase.`
  })
}