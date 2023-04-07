import { test } from '@japa/runner'
import supertest from 'supertest'
import { CleanDb } from '../helpers'
import { UserFactory } from 'Database/factories'
const BASE_URL = `http://localhost:3333`
//Resolve the problem of connection cant recognize the 3333 passed through process.env.PORT.
//Problem with BeforeEach to use BeginTransactions

test.group('User', () => {
  test('it should create an user', async ({ assert }) => {
    await CleanDb()
    const userData = {
      email: 'weiller@test.com',
      username: 'weiller',
      password: 'test',
      avatar: 'https://i.pinimg.com/originals/df/91/02/df91027b7859de1d4e5d2684604737d5.jpg',
    }
    const { body } = await supertest(BASE_URL).post('/api/users').send(userData)
    assert.exists(body, 'User undefined')
    assert.exists(body.id, 'Id undefined')
    assert.equal(body.email, userData.email)
    assert.equal(body.username, userData.username)
    assert.notExists(body.password, 'Password defined')
    assert.equal(body.avatar, userData.avatar)
  })

  test('it should return status 404 if email/username/password is empty', async ({ assert }) => {
    await CleanDb()
    const userData = {
      username: 'weiller',
      password: 'test',
      avatar: 'https://i.pinimg.com/originals/df/91/02/df91027b7859de1d4e5d2684604737d5.jpg',
    }
    const { status } = await supertest(BASE_URL).post('/api/users').send(userData)
    assert.equal(status, 404)
  })
  test('it should return status 404 if email/username/password is empty', async ({ assert }) => {
    await CleanDb()
    const userData = {
      email: 'weiller@test.com',
      username: 123,
      password: 'test',
      avatar: 'https://i.pinimg.com/originals/df/91/02/df91027b7859de1d4e5d2684604737d5.jpg',
    }
    const { status } = await supertest(BASE_URL).post('/api/users').send(userData)
    assert.equal(status, 422)
  })
  test('it should return 409 when email is already in use', async ({ assert }) => {
    await CleanDb()
    const { email } = await UserFactory.create()
    const { status } = await supertest(BASE_URL).post('/api/users').send({
      username: 'test',
      email,
      password: 'test',
    })
    assert.equal(status, 409)
  })
})
