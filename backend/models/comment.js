const db = require("../db");

const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Comment {
    static async getComments(user, api_id) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in.`);
        }

        const query = `SELECT
                    comments.comment, comments.date, comments.user_id, comments.recipe_id, users.username, comments.id, likes.id AS likesPrimaryId, likes.amount
                FROM comments
             JOIN users ON users.id = comments.user_id
             JOIN likes ON likes.comment_id = comments.id
             WHERE comments.recipe_id = (SELECT id FROM all_recipes WHERE api_id = $1)
             ORDER BY date DESC

            `;

        const results = await db.query(query, [api_id]);

        return results.rows;
    }

    static async postComment(user, comment, api_id) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in.`);
        }
        const query = `
            INSERT INTO comments (user_id, recipe_id, comment)
            VALUES ((SELECT id FROM users WHERE username = $1), (SELECT id FROM all_recipes WHERE api_id = $2), $3)
            RETURNING comment, user_id, recipe_id, date, id
        `;

        const results = await db.query(query, [user.username, api_id, comment]);


        const insert_to_likes_table_query = `
            INSERT INTO likes (amount, user_id, comment_id)
            VALUES ($1, (SELECT id FROM users WHERE username = $2), (SELECT id FROM comments WHERE id = $3))
            RETURNING id, amount, user_id, comment_id
        `;

        const insert_to_likes = await db.query(insert_to_likes_table_query, [
            0,
            user.username,
            results.rows[0].id,
        ]);

        console.log(`insert_to_likes: `, insert_to_likes.rows[0]);

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
        console.log("testing", checkIfExisting.rows.length === 0);
        if (checkIfExisting.rows.length === 0) {
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
        console.log("This is comment", comment);
        console.log("COMMENT AMOUNT: ", comment.amount);
        const results = await db.query(
            `UPDATE likes
            SET amount = $1
            WHERE user_id = (SELECT id FROM users WHERE username = $2)
            AND comment_id = $3
            RETURNING amount, id
            `,
            [comment.amount, user.username, comment.id]
        );
        return results.rows[0];
    }

    static async getCommentOwner(user, comment) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in`);
        }

        // const query = `SELECT * FROM comments
        //     JOIN users ON users.id = comments.user_id
        //     WHERE comments.user_id = (SELECT id FROM users WHERE username = $1)
        //     AND
        // `;
        const query = `SELECT * FROM users
            JOIN comments ON comments.user_id = users.id
            WHERE comments.user_id = $1
        `;
        const results = await db.query(query, [comment.user_id]);
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
