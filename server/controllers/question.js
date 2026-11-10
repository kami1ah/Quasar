const Question = require('../models/Question');

const getRandomByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const question = await Question.getRandomByCategory(category);

        res.status(200).json(question);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { getRandomByCategory };