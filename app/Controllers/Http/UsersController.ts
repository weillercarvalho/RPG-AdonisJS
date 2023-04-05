import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const { email, username, password } = body
    if (!email || !username || !password) {
      return response.status(404)
    }
    try {
      const test = await User.create(body)
      return test
    } catch (error) {
      return response.status(500)
    }
  }
}
