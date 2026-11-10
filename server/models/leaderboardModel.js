const db = require('../database/connect')

class Leaderboard {
    constructor ({
        user_id,
        total_points
    }) {
        this.user_id = user_id
        this.total_points = total_points
    }

    static async getAll() {
        const response = await db.query('SELECT user_id, total_points FROM user_game_stats ORDER BY total_points DESC LIMIT 10')
        console.log(response)
        if (response.rows.length === 0) {
            throw new Error('No points available')
        }
        return response.rows.map(c => new Leaderboard(c))
    }
}

module.exports = Leaderboard