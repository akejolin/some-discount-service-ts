/**
* @desc Create response to send data to client.
* @param object $ctx - koa middleware context
* @param * $data - data to be sent
* @return void
*/
import Koa from 'koa';


export default (ctx:Koa.Context, status:number=200, data:string='') => {
  let statusCode = status
  let output = data
  ctx.status = statusCode
  ctx.body = output
}