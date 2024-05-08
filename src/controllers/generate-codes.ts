/**
* @desc Will generate X amount of codes
*/

import Koa from 'koa';
import get from 'lodash.get';
import generateCode from '../lib/generate/generate';

import findLatestId from '../lib/db/find-latest-id';
import DBmodel from '../models/code';
import writeDB from '../lib/db/write-db';
import getItemsDB from '../lib/db/get-items-db';
import {Code} from '../types/dataTypes';

export default async (ctx: Koa.Context) => {

  // Collect params
  const params = {
    amount: get(ctx, 'body.amount', null) !== null ? get(ctx, 'body.amount', null) : get(ctx, 'query.amount', null)
  }

  // ** Find out how many codes should be created **

  // Set default portion to requested amount
  let portionToCreate = Number(params.amount | 5)

  // Get list of codes from DB
  let db:Code[] = await getItemsDB('codes.json', 'id', '*')
  // make a new instance
  db = db.slice()


  // Find out next id
  let nextId = db.length > 0 ? findLatestId(db) + 1 : 0

  const prepForRelationInsert:number[] = []

  // create loop

  const run = Array.from(Array(portionToCreate).keys())

  // Loop and generate new codes
  let promises = run.map(async () => {
    const code = await generateCode(`${nextId}`)
    // Create and push item to db
    const output:Code = {
      id: Number(nextId),
      code,
      desc: '',
      rate: 0.2,
      target: ['*'],
      isUsed: false,
    }
    db.push(output)
    prepForRelationInsert.push(output.id)

    nextId++
  })

  await Promise.all(promises)

  // Save codes
  await writeDB('database', 'codes.json', db)

  // Done
  return ctx.respondToClient(ctx, 200, db)
}