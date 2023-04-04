import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    return response.status(201)
  }
}
