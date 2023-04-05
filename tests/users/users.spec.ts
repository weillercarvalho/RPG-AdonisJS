import { test } from '@japa/runner'
import supertest from 'supertest'
import { CleanDb } from '../helpers'
const BASE_URL = `http://localhost:3333`
//Resolve the problem of connection cant recognize the 3333 passed through process.env.PORT.
CleanDb()

test.group('User', () => {
  test('it should create an user', async ({ assert }) => {
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
    assert.equal(body.password, userData.password)
    assert.equal(body.avatar, userData.avatar)
  })
  test('it should return status 404 if email/username/password is empty', async ({ assert }) => {
    const userData = {
      username: 'weiller',
      password: 'test',
      avatar: 'https://i.pinimg.com/originals/df/91/02/df91027b7859de1d4e5d2684604737d5.jpg',
    }
    const { status } = await supertest(BASE_URL).post('/api/users').send(userData)
    assert.equal(status, 404)
  }).pin()
})
