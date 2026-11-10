const Stat = require('../models/Stat')

const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Stat.getLeaderboard();

        res.status(200).json(leaderboard);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateUserRecord = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { category, points } = req.body;

        const stat = await Stat.updateUserRecord(user_id, category, points);

        res.status(200).json(stat);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getOneById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const stat = await Stat.getOneById(user_id);

        res.status(200).json(stat);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {getLeaderboard,updateUserRecord,getOneById}