const request = require('supertest')
const app = require('../../app')
const { resetTestDB } = require('./config')

describe('User endpoints', () => {
    let api

    beforeEach(async () => {
        await resetTestDB()     
    })    

    beforeAll(() => {
        api = app.listen(3000, () => {
            console.log('Test server running on the port 5000')
        })      
    })
    afterAll((done) => {
        console.log('Gracefully stopping the test server')
        api.close(done)
    })     

    describe('GET /:username', () => {
        it('should respond to GET /:username with the user successfully logged into their account and in the homepage', async () => {
            const username = 'username1'         
            const response = await request(api).get(`/users/${username}`)

            expect(response.status).toBe(200)
            expect(response.body.data).toBe('user_id', 1)
        })

        it('should return a 404 status code if username was not found', async () => {
            const notUsername = 'noUsername200'
            const response = await request(api).get(`/users/${notUsername}`)


            expect(response.status).toBe(404)
            expect(response.body.error).toBe('Unable to locate user.')

        })
    })
})