import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequest from 'App/Exceptions/BadRequestException'
import NotFound from 'App/Exceptions/NotFoundException'
import Unauthorized from 'App/Exceptions/UnauthorizedException'
import Unprocess from 'App/Exceptions/UnprocessException'
import User from 'App/Models/User'
export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const body = request.body()
    const { email, username, password } = body
    if (!email || !username || !password) {
      throw new NotFound('Not found', 404)
    }
    if (password.length < 4 || username.length < 3) {
      throw new Unauthorized('Password/Username too short', 401)
    }
    if (!emailRegex.test(email)) {
      throw new Unauthorized('Invalid email format', 401)
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
  public async update({ request, response, params }: HttpContextContract) {
    const body = request.body()
    if (!body) {
      throw new NotFound('Not found', 404)
    }
    try {
      const updateUser = await User.findOrFail(params.id)
      updateUser.merge(body)
      await updateUser.save()
      return response.status(200)
    } catch (error) {
      return response.status(500)
    }
  }
}
