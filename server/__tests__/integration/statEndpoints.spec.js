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
            expect(response.body).toHaveProperty('user_id', 1)
        })

        it('should return a 404 status code if username was not found', async () => {
            const notUsername = 'noUsername200'
            const response = await request(api).get(`/users/${notUsername}`)


            expect(response.status).toBe(404)
            expect(response.body.error).toBe('Unable to locate user.')

        })
    })

    describe('POST /register', () => {
        it('should respond to POST /register with a new user registering using a username, password and their date of birth', async () => {
            const newUsername = {
                username: "user3",
                password: "pass3", 
                age: "2025-09-07"
                }
            const response = await request(api)
                .post(`/users/register`)
                .send(newUsername)

            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('username', 'user3')
            expect(response.body).toHaveProperty('password')
            expect(response.body).toHaveProperty('age', '2025-09-06T23:00:00.000Z')
        })

        it('should return a 400 status code if the username OR password OR age is not added', async () => {
            const incompleteRegistration = {
                username: 'user3',
                password: "pass3"
            }
            const response = await request(api)
                .post(`/users/register`)
                .send(incompleteRegistration)

            expect(response.status).toBe(400)
            expect(response.body.error).toBe('Age is missing')
        })
    })


    describe('POST /login', () => {
        it('should POST /login with a user successfully logging into the page with their user name and password', async () => {
            const user = {
                username: "user3",
                password: "pass3"
                }

            const response = await request(api)
                .post(`/users/login`)
                .send(user)
            
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('success', true)
            expect(response.body).toHaveProperty('message', 'User authenticated successfully')
        })

        it('should return a 400 status code if the username OR password is not added', async () => {
            const user = {}
            const response = await request(api)
                .post(`/users/login`)
                .send(user)

            expect(response.status).toBe(400)
            expect(response.body.error).toBe('Username and password are required')
            })

        

        it('should return a 401 status code if the user is not correct', async () => {
            const user = {
                username: 'wrongusername',
                password: 'pass4'
            }
            const response = await request(api)
                .post(`/users/login`)
                .send(user)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe('Invalid username or password')
        })
        
        it('should return a 401 status code if the password is not correct', async () => {
            const user = {
                username: 'user4',
                password: 'wrongpassword'
            }
            const response = await request(api)
                .post(`/users/login`)
                .send(user)

            expect(response.status).toBe(401)
            expect(response.body.error).toBe('Invalid username or password')
        })
    })

})

//Stats endpoints
describe('Stat endpoints', () => {
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

    describe('GET /', () => {

        it('should GET / with the all the users total points and total game played', async () => {
            const response = await request(api).get('/stats')

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBeGreaterThan(0)
        })
    })

    describe('GET /:user_id', () => {
        it('should return the a specific user total points and total games played', async () => {
            const userId = 1
            const response = await request(api).get(`/stats/${userId}`)
            console.log(response.body)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('user_id', 1)
            expect(response.body).toHaveProperty('historical_figures_points', 29)
            expect(response.body).toHaveProperty('monuments_points', 34)
            expect(response.body).toHaveProperty('geography_points', 87)
            expect(response.body).toHaveProperty('total_points', 150)
            expect(response.body).toHaveProperty('historical_figures_games', 623)
            expect(response.body).toHaveProperty('monuments_games', 363)
            expect(response.body).toHaveProperty('geography_games', 774)
            expect(response.body).toHaveProperty('total_games', 1760)
        })

        it('should return a 404 status code if the user Id is not found', async () => {
            const noUserIdOf = 999
            const response = await request(api).get(`/stats/${noUserIdOf}`)

            expect(response.status).toBe(404)
            expect(response.body.error).toBe('Unable to locate user data.')


        })
    })

    describe('PATCH /:user_id', () => {
        it('should update an existing users points and number the number of total points', async () => {
            const userId = 1

            const points = {
                category: "Geography",
                points: 872
            }
            const addedPoints = {
                category: "Geography",
                points: 50
            }

        const updatePoints = {
            category: points.category,
            points: points.points + addedPoints.points
        }
        const response = await request(api)
                .patch(`/stats/${userId}`)
                .send(updatePoints)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('user_id', 1)
            expect(response.body).toHaveProperty('geography_points', 1009)
        })
        it('should return 500 if the updates does not exist', async () => {
            const notUserId = 999
            const updatePoints = {
                category: "Geography",
                points: 700
            }
            const response = await request(api)
                .patch(`/stats/${notUserId}`)
                .send(updatePoints)

            expect(response.status).toBe(500)
            expect(response.body.error).toBe('Unable to update user data.')
            })
        })

    
})

describe('Question endpoints', () => {
    let api

    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(() => {
        api = app.listen(4000)
    })

    afterAll((done) => {
        api.close(done)
    })

    describe('GET /:category', () => {

        it('should return a random question from the requested category, including its hints', async () => {
            const category = 'category1'

            const response = await request(api)
                .get(`/question/${category}`)

            expect(response.status).toBe(200)

            // Check question properties
            expect(response.body).toHaveProperty('id')
            expect(response.body).toHaveProperty('image_url')
            expect(response.body).toHaveProperty('answer')
            expect(response.body).toHaveProperty('category', category)
            expect(response.body).toHaveProperty('description')

            // Check hints
            expect(response.body).toHaveProperty('hints')
            expect(response.body.hints).toBeInstanceOf(Array)
        })

        it('should return a 404 status code if no questions exist for the requested category', async () => {
            const category = 'nonexistent_category'

            const response = await request(api)
                .get(`/question/${category}`)

            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('error', 'Unable to locate question.')
        })

    })
})