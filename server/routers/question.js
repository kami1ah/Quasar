const { Router } = require('express');

const questionController = require('../controllers/question.js');

const questionRouter = Router();

questionRouter.get("/:category", questionController.getRandomByCategory);


module.exports = questionRouter;