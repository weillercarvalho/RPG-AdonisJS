import { test } from '@japa/runner'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User', () => {
  test('it should create an user', async () => {
    const userData = { email: 'weiller@test.com', username: 'weiller', password: 'test' }
    console.log(BASE_URL)
    await supertest(BASE_URL).post('/users').send(userData).expect(201)
  }).pin()
})
