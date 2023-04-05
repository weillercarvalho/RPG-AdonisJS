import { test } from '@japa/runner'
import supertest from 'supertest'
import { CleanDb } from '../helpers'
const BASE_URL = `http://localhost:3333`
//Resolve the problem of connection cant recognize the 3333 passed through process.env.PORT.
CleanDb()

test.group('User', () => {
  test('it should create an user', async ({ assert }) => {
    const userData = { email: 'weiller@test.com', username: 'weiller', password: 'test' }
    const { body } = await supertest(BASE_URL).post('/api/users').send(userData).expect(200)
    assert.exists(body, 'User undefined')
    assert.exists(body.id, 'User undefined')
  }).pin()
})
