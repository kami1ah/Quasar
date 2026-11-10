const { Router } = require('express')
const statController = require('../controllers/stat.js')

const statRouter= Router()

statRouter.get('/', statController.getLeaderboard)
statRouter.get('/:user_id', statController.getOneById)
statRouter.patch('/:user_id', statController.updateUserRecord)

module.exports = statRouter