const Question = require('../../../models/Question')
const db = require('../../../database/connect')

describe('Question', () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())
    
    describe('getRandomByCategory', () => {
        it('returns a random question for a specific category', async () => {
            const questionData = {
                question_id: 1,
                image_url: 'image.jpg',
                answer: 'Paris',
                category: 'Geography',
                description: 'What is the capital of France?'
            };

            jest.spyOn(db,'query').mockResolvedValueOnce({rows: [questionData]})

            const result = await Question.getRandomByCategory('Geography')
            expect(result).toBeInstanceOf(Question);
            expect(result).toHaveProperty('id', 1);
            expect(result).toHaveProperty('image_url', 'image.jpg');
            expect(result).toHaveProperty('answer', 'Paris');
            expect(result).toHaveProperty('category', 'Geography');
            expect(result).toHaveProperty('description', 'What is the capital of France?');

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('WHERE category = $1'),
                ['Geography']
            )
        })
        
        it('throws an error if  no question is found', async () => {
            jest.spyOn(db,'query').mockResolvedValueOnce({rows: []})

            await expect( 
                Question.getRandomByCategory('Geography')
            ).rejects.toThrow('Unable to locate question.')
        })
        
        it('throws an error if the database query fails', async () => {
            jest.spyOn(db, 'query').mockRejectedValueOnce(
                new Error('Database error')
            );

            await expect(
                Question.getRandomByCategory('Geography')
            ).rejects.toThrow('Database error');
        });

    })
})