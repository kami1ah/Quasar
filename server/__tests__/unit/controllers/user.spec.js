const userController = require('../../../controllers/user')
const User = require('../../../models/User')
const Stat = require('../../../models/Stat');
const bcrypt = require('bcrypt');


jest.mock('../../../models/User');
jest.mock('../../../models/Stat');
jest.mock('bcrypt');

// Mocking response methods
const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}));

const mockRes = { status: mockStatus };

describe('User controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('register',() => {
        it('should register a new user and create their stats record', async () => {

            // simulates body in POST request
            const mockReq = {
                body: {
                    username: 'user1',
                    password: 'password1',
                    age: '1111-11-11'
                }
            }
            const hashedPassword = 'hashed_password'
            //simulates correctly created user
            const mockUser = {
                id: 1,
                username: 'user1',
                password: hashedPassword,
                age: '1111-11-11'
            };            
            bcrypt.genSalt.mockResolvedValue('mock_salt');
            bcrypt.hash.mockResolvedValue(hashedPassword);
            User.create.mockResolvedValue(mockUser);
            Stat.createUserRecord.mockResolvedValue({ user_id: 1 });
            await userController.register(mockReq, mockRes);

            
            expect(bcrypt.genSalt).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalledWith('password1', 'mock_salt');

            expect(User.create).toHaveBeenCalledWith({
                username: 'user1',
                password: hashedPassword,
                age: '1111-11-11'
            });

            expect(Stat.createUserRecord).toHaveBeenCalledWith(1);

            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockSend).toHaveBeenCalledWith(mockUser);
        
        })
        it('should return a 400 error if registration fails', async () => {
            
            const mockReq = {
                body: {
                    username: 'user1',
                    password: 'password1',
                    age: '1111-11-11'
                }
            };

            User.create.mockRejectedValue(new Error('Unable to create user'));

            
            await userController.register(mockReq, mockRes);

            
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Unable to create user'
            })
        })
    })
    

    describe('login',() => {
        it('should successfully authenticate a user', async () => {
            const mockReq = {
                body: {
                    username: 'user1',
                    password: 'password1'
                }
            };

            const mockUser = {
                id: 1,
                username: 'user1',
                password: 'hashed_password'
            };

            User.getOneByUsername.mockResolvedValueOnce(mockUser)
            bcrypt.compare.mockResolvedValueOnce(true)

            await userController.login(mockReq,mockRes)

            expect(User.getOneByUsername).toHaveBeenCalledWith('user1')

            expect(bcrypt.compare).toHaveBeenCalledWith('password1','hashed_password')

            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                success: true,
                message: 'User authenticated successfully'
            });
        })

        it('should return a 401 error if password is incorrect', async () => {
            const mockReq = {
                body: {
                    username: 'user1',
                    password: 'wrongpassword'
                }
            };

            const mockUser = {
                id: 1,
                username: 'user1',
                password: 'hashed_password'
            };

            User.getOneByUsername.mockResolvedValueOnce(mockUser);
            bcrypt.compare.mockResolvedValueOnce(false);

            
            await userController.login(mockReq, mockRes);

            
            expect(User.getOneByUsername).toHaveBeenCalledWith('user1');
            expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashed_password');

            expect(mockStatus).toHaveBeenCalledWith(401);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Invalid username or password'
            });
        })
        it('should return a 401 error if username does not exist', async () => {
            const mockReq = {
                body: {
                    username: 'unknownuser',
                    password: 'wrongpassword'
                }
            };


            User.getOneByUsername.mockResolvedValueOnce(null);
            

            
            await userController.login(mockReq, mockRes);

            
            expect(User.getOneByUsername).toHaveBeenCalledWith('unknownuser');
            expect(bcrypt.compare).not.toHaveBeenCalledWith();

            expect(mockStatus).toHaveBeenCalledWith(401);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Invalid username or password'
            });
        })
        it('should return 400 if username is missing', async () => {
            const mockReq = {
                body: {
                    password: 'password123'
                }
            };

            
            await userController.login(mockReq, mockRes)

            
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Username and password are required'
            });

            expect(User.getOneByUsername).not.toHaveBeenCalled()

        })
        it('should return 400 if password is missing', async () => {
            const mockReq = {
                body: {
                    username: 'user1'
                }
            };

            
            await userController.login(mockReq, mockRes)

            
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Username and password are required'
            });

            expect(User.getOneByUsername).not.toHaveBeenCalled()
            
        })

        it('should return 500 if database query fails', async () => {
            const mockReq = {
                body: {
                    username: 'user1',
                    password: 'password123'
                }
            };

            User.getOneByUsername.mockRejectedValueOnce(
                new Error('Database connection failed')
            );

            
            await userController.login(mockReq, mockRes);

            
            expect(User.getOneByUsername).toHaveBeenCalledWith('user1')

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Internal server error'
            });
                    
        })
    })

    describe('getUserId',() => {
        it('should return the ID of a user', async () => {
            
            const mockReq = {
                params: {
                    username: 'user1'
                }
            };

            const mockUser = {
                id: 1,
                username: 'user1'
            };

            User.getOneByUsername.mockResolvedValueOnce(mockUser)

            
            await userController.getUserId(mockReq, mockRes)

            expect(User.getOneByUsername).toHaveBeenCalledWith('user1')

            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({
                user_id: 1
            });
            
        })

        it('should return a 404 error if user does not exist', async () => {
            const mockReq = {
                params: {
                    username: 'user1'
                }   
                };

            User.getOneByUsername.mockResolvedValue(null)

            await userController.getUserId(mockReq,mockRes)
            expect(User.getOneByUsername).toHaveBeenCalledWith('user1');

            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                error: "Cannot read properties of null (reading 'id')"
            });

        })
    })
})