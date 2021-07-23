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
            api_id,
            comment,
        ]);

        return results.rows[0];
    }

    static async deleteComment(user, comment_id) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in`);
        }

        console.log(
            "user.username: ",
            user.username,
            " comment_id: ",
            comment_id
        );

        const checkIfExisting = await db.query(
            `SELECT * FROM comments
            WHERE user_id = (SELECT id FROM users WHERE username = $1)
            AND id = $2`,
            [user.username, comment_id]
        );

        if (checkIfExisting.rows.length !== 1) {
            throw new BadRequestError("You don't own this comment");
        }

        const results = await db.query(
            `DELETE FROM comments
            WHERE user_id = (SELECT id FROM users WHERE username = $1)
            AND id = $2
            `,
            [user.username, comment_id]
        );
        console.log(results.rows[0]);

        return results.rows[0];
    }

    static async editComment(user, comment) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in`);
        }

        console.log(comment.comment, comment.id);

        const checkIfExisting = await db.query(
            `SELECT * FROM comments
            WHERE user_id = (SELECT id FROM users WHERE username = $1)
            AND id = $2`,
            [user.username, comment.id]
        );

        if (checkIfExisting.rows.length !== 1) {
            throw new BadRequestError("You don't own this comment");
        }

        const results = await db.query(
            `UPDATE comments
            SET comment = $1
            WHERE user_id = (SELECT id FROM users WHERE username = $2)
            AND id = $3
            RETURNING comment, id
            `,
            [comment.comment, user.username, comment.id]
        );
        console.log("results.rows[0]: ", results.rows[0]);
        return results.rows[0];

        // return results.rows[0];
    }

    static async likesToModify(user, comment) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in`);
        }
        console.log(comment);
        const results = await db.query(
            `UPDATE likes
            SET amount = $1
            WHERE user_id = (SELECT id FROM users WHERE username = $2)
            AND comment_id = $3
            RETURNING amount, id
            `,
            [10, user.username, comment.id]
        );
        return results.rows[0];
    }

    static async belongsToUser(user, cur_api_id) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in`);
        }
        console.log(user, cur_api_id);
        const results = await db.query(
            `SELECT * FROM comments
            WHERE user_id = (SELECT id FROM users WHERE username = $1)
            AND recipe_id = (SELECT id FROM all_recipes WHERE api_id = $2)
            `,
            [user.username, cur_api_id]
        );
        console.log(results.rows[0]);
        // if (results.length === 0) {
        //     throw new BadRequestError("does not belong to you");
        // }

        return results.rows[0];
    }
}

module.exports = Comment;
