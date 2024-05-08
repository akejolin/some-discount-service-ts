/**
* @desc Test to write mock file.
*/

import request from 'supertest';
import app from '../index'

import randomErrors from './randomErrors';
import { ResponseError } from '../lib/errors';
import Koa from 'koa';

describe("randomErrors", () => {
    it("shall throw on 404", async () => {
      try {
        const response = await request(app.callback()).get('/not-found');
      } catch (error) {
        expect(error).toEqual(new ResponseError(`Nope, that's a 404.`, 404, 'Not found.'));
      }
    });
    it("shall throw on 403 when token is missing", async () => {
      try {
        const response = await request(app.callback()).get('/use-code');
      } catch (error) {
        throw new ResponseError(`Token is missing:`, 403, 'Forbidden');
      }
    });
  });