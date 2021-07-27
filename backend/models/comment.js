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
        console.log(user.username);
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

    // user, comment, api_id
    // get all comments in the page
    // run the function to check if user alreayd liked it

    static async checkIfUserIsInLikes(user, api_id) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in`);
        }
        console.log(api_id);

        // SELECT * FROM comments
        //     JOIN likes ON likes.comment_id = comments.id
        //     WHERE comments.user_id = (SELECT id FROM users WHERE username = $1)
        //     AND comments.recipe_id = (SELECT id FROM all_recipes WHERE api_id = $2)
        // AND $3 = ANY(likes.arrayOfUserId)

        const query = `SELECT * FROM comments
            JOIN likes ON likes.comment_id = comments.id
            WHERE comments.recipe_id = (SELECT id FROM all_recipes WHERE api_id = $1)
            AND $2 = ANY(likes.arrayOfUserId)
        `;

        const results = await db.query(query, [api_id, user.username]);

        console.log("checkIfUserIsInLikes(): ", results.rows);
        if (results.rows.length > 0) {
            return true;
        }
        return false;
    }

    static async likeTheComment(user, comment) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in`);
        }

        // To add: arrayOfUserId = arrayOfUserId || ARRAY[$2]
        // To remove: arrayOfUserId = array_remove(arrayOfUserId, $2)
        console.log(comment);
        // const determine_if_user_in_likes_arr = await db.query(
        //     `SELECT * FROM likes WHERE $1 = ANY(arrayOfUserId) AND comment_id = $2`,
        //     [user.username, comment.id]
        // );

        // // If length 0 then that means the user has not "Liked" the comment yet

        // if (determine_if_user_in_likes_arr.rows.length > 0) {
        //     throw new BadRequestError("User already liked");
        // }

        const results = await db.query(
            `UPDATE likes
            SET amount = $1,
                arrayOfUserId = arrayOfUserId || ARRAY[$2]
            WHERE comment_id = $3
            RETURNING amount, id, arrayOfUserId
            `,
            [comment.amount, user.username, comment.id]
        );

        console.log("results", results.rows[0]);

        return results.rows[0];
    }

    static async unlikeTheComment(user, comment) {
        if (!user) {
            throw new UnauthorizedError(`No user logged in`);
        }

        const results = await db.query(
            `UPDATE likes
            SET amount = $1,
                arrayOfUserId = array_remove(arrayOfUserId, $2)
            WHERE comment_id = $3
            RETURNING amount, id, arrayOfUserId
            `,
            [comment.amount, user.username, comment.id]
        );

        console.log("unlike results", results.rows[0]);

        return results.rows[0];
    }
}

module.exports = Comment;
