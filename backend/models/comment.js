const db = require("../db");

const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Comment {
    static async getComments(user, recipeId) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in.`);
        }

        const results = await db.query(
            `SELECT * FROM comments
            JOIN all_recipes ON comments.recipe_id = all_recipes.id
            AND all_recipes.api_id = $1
            ORDER BY date DESC
            `,
            [recipeId]
        );

        return results.rows;
    }

    static async postComment(user, comment, recipeId) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in.`);
        }
        console.log(user, comment, recipeId);
        const query = `INSERT INTO comments (user_id, recipe_id, comment)
            VALUES ((SELECT id FROM users WHERE username = $1), (SELECT id FROM all_recipes WHERE api_id = $2), $3)
            RETURNING comment, user_id, recipe_id, date, id
        `;

        const results = await db.query(query, [
            user.username,
            parseInt(recipeId),
            comment,
        ]);

        // const query = `SELECT id FROM all_recipes WHERE api_id = $1`;
        // console.log(parseInt(recipeId));
        // const results = await db.query(query, [recipeId]);

        return results.rows[0];
    }

    // static async deleteComment(user, comment, recipeId) {
    //     if (!user) {
    //         throw new UnauthorizedError(`No user logged in`);
    //     }

    //     const results = await db.query(`
    //         DELETE FROM comments WHERE`

    //     )
    // }
}

module.exports = Comment;
