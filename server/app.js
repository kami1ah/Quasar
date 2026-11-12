const express = require('express')
const cors = require('cors')
//const logger = require('./logger')

//const gameRouter = require('./routers/router')
const userRouter = require('./routers/user');
const questionRouter = require('./routers/question');
const statRouter = require('./routers/stat');
const app = express()
app.use(cors())
//app.use(logger)
app.use(express.json())
const path = require("path");

//app.use('/router', gameRouter)

// app.get("/", (req, res) => {
//     res.json({
//         name: "Educational-image-game",
//     })
// })

app.use(express.static(path.join(__dirname + '../client')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/html/login.html"));
});


app.use('/users', userRouter)
app.use('/question',questionRouter)
app.use('/stats',statRouter)


module.exports = app
