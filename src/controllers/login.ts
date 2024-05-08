/**
* @desc login and create token
*/

import Koa from 'koa';
//import get from 'lodash.get';
import get from 'lodash.get';
import getItemDB from '../lib/db/get-item-db';
import {User} from '../types/dataTypes'
import { config } from '../middleware/auth-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ResponseError } from '../lib/errors';

export default async (ctx:Koa.Context) => {

  // Collect params
  const params = {
    username: get(ctx, 'body.username', null) !== null ? get(ctx, 'body.username', null) : get(ctx, 'query.username', null),
    password: get(ctx, 'body.password', null) !== null ? get(ctx, 'body.password', null) : get(ctx, 'query.password', null),
  }

  // Param username validation
  if (params.username === null) {
    throw new ResponseError(`username param is missing`, 400, 'Bad request');
  }

  if (params.username === '') {
    throw new ResponseError(`username param was provided but with empty value`, 400, 'Bad request');
  }

  // Param password validation
  if (params.password === null) {
    throw new ResponseError(`password param is missing`, 400, 'Bad request');
  }

  if (params.password === '') {
    throw new ResponseError(`password param was provided but with empty value`, 400, 'Bad request');
  }

  // Get user from db as a reference
  let user:User|null = await getItemDB('users.json', 'username', params.username);

  // Validate password
  if (user) {
    const passwordIsValid = bcrypt.compareSync(
      params.password,
      user.password
    )

    if (!passwordIsValid) {
      throw new ResponseError(`Password is invalid`, 401, 'Unauthorized');
    }

    // create token
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    })

    // Todo: Remove this
    ctx.setUserId(user.id)
    ctx.setToken(token)

    return ctx.respondToClient(ctx, 200, {
      response: {
        status: 'user logged in',
        token,
      }
    })

  } else {
    throw new ResponseError(`Username is invalid`, 401, 'Unauthorized');
  }
}