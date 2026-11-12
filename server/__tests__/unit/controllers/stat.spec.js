const statController = require('../../../controllers/stat')
const Stat = require('../../../models/Stat')

jest.mock('../../../models/Stat')


const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}));

const mockRes = { status: mockStatus };

describe('Stat controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('getLeaderboard', () => {
        it('should return 200 and the leaderboard', async () => {
            const mockLeaderboard = [
                { user_id: 1, username: 'user1', points: 500 },
                { user_id: 2, username: 'user2', points: 300 }
            ]

            Stat.getLeaderboard.mockResolvedValue(mockLeaderboard)

            await statController.getLeaderboard({}, mockRes)

            expect(Stat.getLeaderboard).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(mockLeaderboard)
        })

        it('should return 500 if there is a server error', async () => {

        Stat.getLeaderboard.mockRejectedValue(new Error('Database error'))

        await statController.getLeaderboard({}, mockRes)

        expect(Stat.getLeaderboard).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(500)
        expect(mockJson).toHaveBeenCalledWith({
            error: 'Database error'
            })
        })


    })
    describe('updateUserRecord', () => {
        it('should return 200 and the updated stat', async () => {
            const mockStat = {
                user_id: 1,
                category: 'Geography',
                points: 500
            }

            const mockReq = {
                params: { user_id: 1 },
                body: { category: 'Geography', points: 500 }
            }

            Stat.updateUserRecord.mockResolvedValue(mockStat)

            await statController.updateUserRecord(mockReq, mockRes)

            expect(Stat.updateUserRecord).toHaveBeenCalledWith(
                1, 'Geography', 500
            )
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(mockStat)
        })


        it('should return 500 if there is a server error', async () => {
            const mockReq = {
                    params: { user_id: 1 },
                    body: { category: 'Geography', points: 500 }
                }

            Stat.updateUserRecord.mockRejectedValue(
                new Error('Database error')
            )

            await statController.updateUserRecord(mockReq, mockRes)

            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Database error'
            })
        })
    })

    describe('getOneById', () => {
        it('should return 200 and the user stats', async () => {

            const mockStat = {
                user_id: 1,
                username: 'user1',
                points: 500
            }

            const mockReq = {
                params: { user_id: 1 }
            }

            Stat.getOneById.mockResolvedValue(mockStat)

            await statController.getOneById(mockReq, mockRes)

            expect(Stat.getOneById).toHaveBeenCalledWith(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(mockStat)
        })        
        it('should return 404 if the user is not found', async () => {
            const mockReq = {
                params: { user_id: 999 }
            }

            Stat.getOneById.mockRejectedValue(
                new Error('User stats not found')
            )
            await statController.getOneById(mockReq,mockRes)
            expect(Stat.getOneById).toHaveBeenCalledWith(999)
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({
                error: 'User stats not found'
            })            
            
        })
    })
})