const db = require('../database/connect');

class Question {
    constructor({ question_id, image_url, answer, category, description }) {
        this.id = question_id;
        this.image_url = image_url;
        this.answer = answer;
        this.category = category;
        this.description = description;
    }

    static async getRandomByCategory(category) {
        const response = await db.query(
            `SELECT * FROM questions
             WHERE category = $1
             ORDER BY RANDOM()
             LIMIT 1`,
            [category]
        );

        if (response.rows.length != 1) {
            throw new Error("Unable to locate question.");
        }

        return new Question(response.rows[0]);
    }


}

module.exports = Question;