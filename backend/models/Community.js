const db = require("../db");

const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Community {
    static async getPosts() {
        const query = `
            SELECT
                c.id, c.title, c.category, c.image_url, c.prep_time, c.description, c.date, u.username, c.user_id, AVG(r.rating) AS "rating" FROM community_all_recipes AS c
            LEFT JOIN users AS u ON u.id = c.user_id
            LEFT JOIN community_ratings AS r ON r.post_id = c.id
            GROUP BY c.id, u.username
            ORDER BY c.date DESC
        `;

        const results = await db.query(query);

        return results.rows;
    }

    static async newPost(user, post) {
        console.log(user);
        if (!user) {
            throw new BadRequestError("no user");
        }

        const results = await db.query(
            `
            INSERT INTO community_all_recipes (title, category, image_url, prep_time, description, user_id)
            VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE username = $6))
            RETURNING id, title, category, image_url, prep_time, description, user_id, date, $7 as "username", user_id
        `,
            [
                post.title,
                post.category,
                post.image_url,
                post.prep_time,
                post.description,
                user.username,
                user.username,
            ]
        );
        return results.rows[0];
    }

    static async deletePost(user, post) {
        console.log(post.id, user.username);
        if (!user) {
            throw new BadRequestError("bad request");
        }

        const results = await db.query(
            `DELETE FROM community_all_recipes
                WHERE user_id = (SELECT id FROM users WHERE username = $1)
                AND id = $2`,
            [user.username, post.id]
        );
        return results.rows[0];
    }

    static async ratingForPost(rating, user, postId) {
        console.log(rating, user, postId);
        if (!user) {
            throw new BadRequestError("no user");
        }
        if (!Number(rating)) {
            throw new BadRequestError(`no num given`);
        }

        const existingRating = await Community.doesRatingAlreadyExist(
            user,
            postId
        );
        console.log("existingRating", existingRating);
        if (existingRating) {
            throw new BadRequestError("you already voted for this post");
        }

        const results = await db.query(
            `
            INSERT INTO community_ratings (rating, post_id, user_id)
                VALUES ($1, $2, (SELECT id FROM users WHERE username = $3))
                RETURNING rating, post_id, user_id, created_at
            `,
            [rating, postId, user.username]
        );
        return results.rows[0];
    }

    static async doesRatingAlreadyExist(user, postId) {
        const results = await db.query(
            `
            SELECT rating FROM community_ratings
            WHERE user_id = (SELECT id FROM users WHERE username = $1)
            AND post_id = $2
        `,
            [user.username, postId]
        );

        return results.rows[0];
    }
}
module.exports = Community;
