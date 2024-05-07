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

export default async (ctx:Koa.Context) => {

  // Collect params
  const params = {
    username: get(ctx, 'body.username', null) !== null ? get(ctx, 'body.username', null) : get(ctx, 'query.username', null),
    password: get(ctx, 'body.password', null) !== null ? get(ctx, 'body.password', null) : get(ctx, 'query.password', null),
  }

  // Param username validation
  if (params.username === null) {
    return ctx.respondToClient(ctx, 400 , `username param is missing`)
  }

  if (params.username === '') {
    return ctx.respondToClient(ctx, 400 , `username param was provided but with empty value`)
  }

  // Param password validation
  if (params.password === null) {
    return ctx.respondToClient(ctx, 400 , `password param is missing`)
  }

  if (params.password === '') {
    return ctx.respondToClient(ctx, 400 , `password param was provided but with empty value`)
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
      return ctx.respondToClient(ctx, 401, 'password is invalid')
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
    return ctx.respondToClient(ctx, 401, 'Username is invalid')
  }
}