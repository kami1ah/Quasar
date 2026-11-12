const Question = require('../models/Question');
const Hint = require('../models/Hint');

const getRandomByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const question = await Question.getRandomByCategory(category);
        const hints = await Hint.getByQuestionId(question.id);

        res.status(200).json({ ...question, hints: hints });

    } catch (error) {
        res.status(404).json({
            error: 'Unable to locate question.'
        });
    }
};

module.exports = { getRandomByCategory };