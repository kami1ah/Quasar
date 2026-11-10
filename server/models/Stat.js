const db = require('../database/connect')

class Stat {
constructor({ user_id, historical_figures_points, monuments_points, geography_points, total_points,
     historical_figures_games, monuments_games, geography_games, total_games }) {
        this.user_id = user_id;
        this.historical_figures_points = historical_figures_points;
        this.monuments_points = monuments_points;
        this.geography_points = geography_points;
        this.total_points = total_points;
        this.historical_figures_games = historical_figures_games;
        this.monuments_games = monuments_games;
        this.geography_games = geography_games;
        this.total_games = total_games;
    }
    //get function that points and games played
    static async getOneById(user_id) {
        const response = await db.query(
            `SELECT * FROM user_game_stats
             WHERE user_id = $1`,
            [user_id]
        );
        console.log(response.rows)
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user data.");
        }

        return new Stat(response.rows[0]);
    }
    static async createUserRecord(user_id) {
        const response = await db.query(
            `INSERT INTO user_game_stats (user_id)
            VALUES ($1)
            RETURNING *`,
            [user_id]
        );

        return new Stat(response.rows[0]);
    }
    static async updateUserRecord(user_id, category, points) {
        const response = await db.query(
            `UPDATE user_game_stats
            SET ${category}_points = ${category}_points + $1,
                ${category}_games = ${category}_games + 1
            WHERE user_id = $2
            RETURNING *`,
            [points, user_id]
        );

        if (response.rows.length !== 1) {
            throw new Error("Unable to update user data.");
        }

        return new Stat(response.rows[0]);
    }
    static async getLeaderboard() {
        const response = await db.query(
            `SELECT 
                user_account.username,
                user_game_stats.total_points,
                user_game_stats.total_games
            FROM user_game_stats
            JOIN user_account
            ON user_game_stats.user_id = user_account.user_id
            ORDER BY user_game_stats.total_points DESC
            LIMIT 10`
        );

        return response.rows;
    }

}

module.exports = Stat