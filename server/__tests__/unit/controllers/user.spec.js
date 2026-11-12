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

            // Assert
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
            // Arrange
            const mockReq = {
                body: {
                    username: 'user1',
                    password: 'password1',
                    age: '1111-11-11'
                }
            };

            User.create.mockRejectedValue(new Error('Unable to create user'));

            // Act
            await userController.register(mockReq, mockRes);

            // Assert
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Unable to create user'
            })
        })
    })
    

    describe('login',() => {
        
    })

    describe('getUserId',() => {
        
    })
})