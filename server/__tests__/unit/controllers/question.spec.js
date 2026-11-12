const questionController = require('../../../controllers/question')
const Question = require('../../../models/Question')
const Hint = require('../../../models/Hint');


jest.mock('../../../models/Hint')
jest.mock('../../../models/Question')


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

describe('Question controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('getRandomByCategory', () => {
        it('should return a random question with its hints', async () => {
            const mockReq = {
                params: {
                    category: 'Geography'
                }
            };

            const mockQuestion = {
                id: 1,
                answer: 'France',
                category: 'Geography',
                description: 'A country in Europe'
            };

            const mockHints = [
                {
                    id: 1,
                    question_id: 1,
                    hint_order: 1,
                    hint_text: 'It is in Europe'
                },
                {
                    id: 2,
                    question_id: 1,
                    hint_order: 2,
                    hint_text: 'Its capital is Paris'
                }
            ];  
            
            Question.getRandomByCategory.mockResolvedValueOnce(mockQuestion)
            Hint.getByQuestionId.mockResolvedValueOnce(mockHints)

            await questionController.getRandomByCategory(mockReq,mockRes)

            expect(Question.getRandomByCategory).toHaveBeenCalledWith('Geography');

            expect(Hint.getByQuestionId).toHaveBeenCalledWith(1);

            expect(mockStatus).toHaveBeenCalledWith(200);

            expect(mockJson).toHaveBeenCalledWith({
                ...mockQuestion,
                hints: mockHints
            });
        })

        it('should return 404 if no question is found', async () => {
            const mockReq = {
                params: {
                    category: 'Geography'
                }
            };

            Question.getRandomByCategory.mockRejectedValueOnce(
                new Error('Unable to locate question.')
            );

            // Act
            await questionController.getRandomByCategory(mockReq, mockRes);

            // Assert
            expect(Question.getRandomByCategory).toHaveBeenCalledWith('Geography');

            expect(mockStatus).toHaveBeenCalledWith(404);

            expect(mockJson).toHaveBeenCalledWith({
                error: 'Unable to locate question.'
            });

            expect(Hint.getByQuestionId).not.toHaveBeenCalled();
        })

    })
})