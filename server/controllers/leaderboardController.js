const Leaderboard = require('../models/leaderboardModel')

async function index(req, res) {
    try{
        const leaders = await Leaderboard.getAll()
        console.log(leaders)
        res.status(200).json(leaders)
    }catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {index}