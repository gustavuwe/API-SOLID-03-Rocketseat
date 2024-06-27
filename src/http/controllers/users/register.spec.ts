import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import { app }from '@/app'
import request from 'supertest'

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready() // wait for the app be ready to run the tests.
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const response = await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(201)
    })
})