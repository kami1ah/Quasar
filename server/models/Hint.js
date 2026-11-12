const db = require('../database/connect');

class Hint {
    constructor({ hint_id, question_id, hint_order, hint_text }) {
        this.id = hint_id;
        this.question_id = question_id;
        this.hint_order = hint_order;
        this.hint_text = hint_text;
    }
    static async getByQuestionId(question_id) {
        const response = await db.query(
            `SELECT * FROM hints
             WHERE question_id = $1
             ORDER BY hint_order ASC`,
            [question_id]
        );

        return response.rows.map(row => new Hint(row));
    }
}

module.exports = Hint;