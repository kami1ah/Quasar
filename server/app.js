const express = require('express')
const cors = require('cors')
//const logger = require('./logger')

//const gameRouter = require('./routers/router')
const userRouter = require('./routers/user');
const questionRouter = require('./routers/question');

const app = express()
app.use(cors())
//app.use(logger)
app.use(express.json())

//app.use('/router', gameRouter)

app.get("/", (req, res) => {
    res.json({
        name: "Educational-image-game",
    })
})


app.use('/users', userRouter)
app.use('/question',questionRouter)

const leaderboardRouter = require("./routers/leaderboardRouter");

app.use("/api", leaderboardRouter);

module.exports = app
