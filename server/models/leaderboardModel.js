const db = require('../database/connect')

class Leaderboard {
    constructor ({
        user_id,
        username,
        points
    }) {
        this.user_id = user_id
        this.username = username
        this.points = points
    }

    static async getAll(points) {
        const response = await db.query('SELECT username, points FROM user_account ORDER BY points DESC LIMIT 10')
        if (response.rows.length === 0) {
            throw new Error('No points available')
        }
        return response.rows.map(c => new Leaderboard(c))
    }
}

module.exports = Leaderboard