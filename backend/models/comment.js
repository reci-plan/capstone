const db = require("../db");

const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Comment {
    static async getComments(user, api_id) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in.`);
        }

        const query = `SELECT * FROM comments
            WHERE recipe_id = (SELECT id FROM all_recipes WHERE api_id = $1)
            ORDER BY date DESC
            `;

        const results = await db.query(query, [api_id]);

        return results.rows;
    }

    static async postComment(user, comment, api_id) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in.`);
        }
        const query = `INSERT INTO comments (user_id, recipe_id, comment)
            VALUES ((SELECT id FROM users WHERE username = $1), (SELECT id FROM all_recipes WHERE api_id = $2), $3)
            RETURNING comment, user_id, recipe_id, date, id
        `;

        const results = await db.query(query, [
            user.username,
            parseInt(api_id),
            comment,
        ]);

        return results.rows[0];
    }

    static async deleteComment(user, comment_id) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in`);
        }

        console.log(user, comment_id);

        const results = await db.query(
            `DELETE FROM comments
            WHERE id = $1
            AND user_id = (SELECT id FROM users WHERE username = $2)`,
            [comment_id, user.username]
        );

        return results.rows[0];
    }
}

module.exports = Comment;
