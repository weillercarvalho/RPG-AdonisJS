import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnprocessException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class Unprocess extends Exception {
  public code = 'UNPROCESS_ENTITY'
  public async handle(error: this, ctx: HttpContextContract) {
    return ctx.response
      .status(error.status)
      .send({ code: error.code, message: error.message, status: error.status })
  }
}
