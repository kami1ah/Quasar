const Stat = require('../../../models/Stat')
const db = require('../../../database/connect')

describe('Stat', () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('getOneById', () => {
        it('should return user stats for a specific user ID', async () => {
            const mockStats = {            
            user_id: 1,
            historical_figures_points: 100,
            monuments_points: 200,
            geography_points: 300,
            total_points: 600,
            historical_figures_games: 2,
            monuments_games: 3,
            geography_games: 4,
            total_games: 9}

            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [mockStats]})

            const result = await Stat.getOneById(1)
            expect(result).toBeInstanceOf(Stat);
            expect(result).toMatchObject(mockStats);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('WHERE user_id = $1'),
                [1]
            );            

        })
        it('should throw an error if user stats are not found', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: []
            });

            await expect(Stat.getOneById(1))
                .rejects.toThrow('Unable to locate user data.');
        });

        it('should throw an error if the database query fails', async () => {
            jest.spyOn(db, 'query').mockRejectedValueOnce(
                new Error('Database error')
            );

            await expect(Stat.getOneById(1))
                .rejects.toThrow('Database error');
        });
    })

    describe('createUserRecord', () => {
        it ('should create a statistic record for a user', async () => {
            const mockStats = {
            user_id: 1,
            historical_figures_points: 0,
            monuments_points: 0,
            geography_points: 0,
            total_points: 0,
            historical_figures_games: 0,
            monuments_games: 0,
            geography_games: 0,
            total_games: 0
        };
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [mockStats]})

            const result = await Stat.createUserRecord(1)
            expect(result).toBeInstanceOf(Stat);
            expect(result).toMatchObject(mockStats);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO user_game_stats'),
                [1]
            );            
        })
            
    })

    describe('updateUserRecord', () => {
        it('should update points and games for a specific category', async () => {
            const mockStats = {
                user_id: 1,
                historical_figures_points: 100,
                monuments_points: 0,
                geography_points: 0,
                total_points: 100,
                historical_figures_games: 1,
                monuments_games: 0,
                geography_games: 0,
                total_games: 1
            };
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [mockStats]})

            const result = await Stat.updateUserRecord(1,'historical_figures',100)
            expect(result.historical_figures_points).toBe(100);
            expect(result.historical_figures_games).toBe(1);
            expect(result.total_points).toBe(100);
            expect(result.total_games).toBe(1);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE user_game_stats'),
                [100, 1]
            );
        })
        it('should throw an error if the user statistics cannot be updated', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: []
            });

            await expect(
                Stat.updateUserRecord(1, 'historical_figures', 100)
            ).rejects.toThrow('Unable to update user data.');
        });

    })
    describe('getLeaderboard', () => {
        it('should return the top 10 users ranked by total points', async () => {
            const mockLeaderboard = [
                {
                    username: 'user1',
                    total_points: 1000,
                    total_games: 10
                },
                {
                    username: 'user2',
                    total_points: 800,
                    total_games: 8
                }
            ];          
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: mockLeaderboard });
            const result = await Stat.getLeaderboard();

            expect(result).toEqual(mockLeaderboard);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('ORDER BY user_game_stats.total_points DESC')  
            )         
        })
    })
})