const express = require('express')
const cors = require('cors')
const logger = require('./logger')

const gameRouter = require('./routers/router')


const app = express()
app.use(cors())
app.use(logger)
app.use(express.json())

app.use('/router', gameRouter)


const userRouter = require('./routers/user')

app.use('/user', userRouter)


module.exports = app
