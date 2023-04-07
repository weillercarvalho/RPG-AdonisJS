import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequest from 'App/Exceptions/BadRequestException'
import NotFound from 'App/Exceptions/NotFoundException'
import Unprocess from 'App/Exceptions/UnprocessException'
import User from 'App/Models/User'
export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const { email, username, password } = body
    if (!email || !username || !password) {
      throw new NotFound('Not found', 404)
    }
    if (!isNaN(email) || !isNaN(username) || !isNaN(password)) {
      throw new Unprocess('Invalid Format', 422)
    }
    const getEmail = await User.findBy('email', email)
    if (getEmail) {
      throw new BadRequest('Email already used', 409)
    }
    try {
      const test = await User.create(body)
      return test
    } catch (error) {
      return response.status(500)
    }
  }
}
