const User = require('../../../models/User')
const db = require('../../../database/connect')

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('getOneById', () => {
        it('should return user for a specific ID', async () => {

            const mockUsers =  {user_id:1,username:'user1',password:'password1',age:'1111-11-11'}
            
            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [mockUsers]})

            const users = await User.getOneById(1)

            expect(users).toBeInstanceOf(User)
            expect(users.username).toBe('user1')
            expect(users.id).toBe(1)
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM user_account WHERE user_id = $1', [1])
        })
        it('should throw an Error when user is not found', async () => {
        // Arrange
        jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

        // Act & Assert
        await expect(User.getOneById(999)).rejects.toThrow('Unable to locate user.');
        });
    })

    describe('getOneByUsername', () => {
        it('should return user for a specific username', async () => {
            const mockUsers =  {user_id:1,username:'user1',password:'password1',age:'1111-11-11'}
            
            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [mockUsers]})

            const users = await User.getOneByUsername('user1')

            expect(users).toBeInstanceOf(User)
            expect(users.username).toBe('user1')
            expect(users.id).toBe(1)
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM user_account WHERE username = $1', ['user1'])

        })
        it('should throw an Error when user is not found', async () => {
        // Arrange
        jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

        // Act & Assert
        await expect(User.getOneByUsername('user999')).rejects.toThrow('Unable to locate user.');
        });
    })

    describe('create', () => {
        it('resolves with user on successful creation', async () => {
            const userData = { username: 'user1',password: 'password1', age: '111-11-11'}

            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ ...userData,user_id: 1 }]
                })
                .mockResolvedValueOnce({
                    rows: [{ ...userData, user_id: 1 }]
                });

            const result = await User.create(userData)

            expect(result).toBeInstanceOf(User);
            expect(result).toHaveProperty('id', 1);
            expect(result).toHaveProperty('username', 'user1');
            expect(result).toHaveProperty('age', '111-11-11');   
            expect(db.query).toHaveBeenCalledWith("INSERT INTO user_account (username, password,age) VALUES ($1, $2,$3) RETURNING *;",
                [userData.username,userData.password,userData.age]
            )         
        })

        it('should throw an error when username is missing', async () => {
            const incompleteUserData = { password: 'password1', age: '111-11-11'}

            await expect(User.create(incompleteUserData)).rejects.toThrow('Username is missing');
        })

        it('should throw an error when password is missing', async () => {
            const incompleteUserData = { username: 'user1',age: '111-11-11'}

            await expect(User.create(incompleteUserData)).rejects.toThrow('Password is missing');
        })

        it('should throw an error when age is missing', async () => {
            const incompleteUserData = { username: 'user1',password: 'password1'}

            await expect(User.create(incompleteUserData)).rejects.toThrow('Age is missing');
        })
    })

})