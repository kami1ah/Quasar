const Hint = require('../../../models/Hint')
const db = require('../../../database/connect')

describe('Hint', () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())
    
    describe('getByQuestionId', () => {
        it('retrieves all hints belonging to a specific question', async () => {
            const hintData = [
                {
                    hint_id: 1,
                    question_id: 5,
                    hint_order: 1,
                    hint_text: 'It starts with P'
                },
                {
                    hint_id: 2,
                    question_id: 5,
                    hint_order: 2,
                    hint_text: 'It is in Europe'
                }
            ];
            
            jest.spyOn(db,'query').mockResolvedValueOnce({rows:hintData})

            const result = await Hint.getByQuestionId(5)
            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(Hint);
            expect(result[1]).toBeInstanceOf(Hint);

            expect(result[0]).toHaveProperty('id', 1);
            expect(result[0]).toHaveProperty('question_id', 5);
            expect(result[0]).toHaveProperty('hint_order', 1);
            expect(result[0]).toHaveProperty('hint_text', 'It starts with P');           
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('WHERE question_id = $1'),
                [5]
            )

        })
        it('returns an empty array if no hints are found', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: []
            });

            const result = await Hint.getByQuestionId(99);

            expect(result).toEqual([]);
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('WHERE question_id = $1'),
                [99]
            );
        });



    })
})