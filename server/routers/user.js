const { Router } = require('express');

const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.get('/:username', userController.getUserId);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

module.exports = userRouter;