const db = require('../database/connect');

class User {

    constructor({user_id,username,password,age}) {
        this.id = user_id
        this.username = username
        this.password = password
        this.age = age
    }
    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }
    static async create(data) {
        if (!data.username) {
            throw new Error("Username is missing");
        }

        if (!data.password) {
            throw new Error("Password is missing");
        }
        if (!data.age) {
            throw new Error("Age is missing");
        }
        const response = await db.query(
            "INSERT INTO user_account (username, password,age) VALUES ($1, $2,$3) RETURNING *;",
            [data.username, data.password, data.age]
        );

        return new User(response.rows[0]);
    }
}

module.exports = User;