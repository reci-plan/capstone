const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
    static makeUser(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            created_at: user.created_at,
        };
    }

    static async register(credentials) {
        const requiredFields = [
            "email",
            "username",
            "password",
            "first_name",
            "last_name",
        ];

        requiredFields.forEach((field) => {
            if (!credentials[field]) {
                throw new BadRequestError(`${field} not in request.body`);
            }
        });

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.");
        }

        const existingUser = await User.fetchUserByEmail(credentials.email);
        if (existingUser) {
            throw new BadRequestError(
                `User already exists: ${credentials.email}`
            );
        }

        const existingUsername = await User.fetchUserByUsername(
            credentials.username
        );
        if (existingUsername) {
            throw new BadRequestError(
                `User already exists: ${credentials.username}`
            );
        }

        const hashedPassword = await bcrypt.hash(
            credentials.password,
            BCRYPT_WORK_FACTOR
        );

        const query = `INSERT INTO users (email, first_name, last_name, username, password)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, email, first_name, last_name, username;
            `;
        const insertToDb = await db.query(query, [
            credentials.email.toLowerCase(),
            credentials.first_name,
            credentials.last_name,
            credentials.username,
            hashedPassword,
        ]);

        const res = insertToDb.rows[0];

        return User.makeUser(res);
    }

    static async login(credentials) {
        const requiredFields = ["email", "password"];
        requiredFields.forEach((field) => {
            if (!credentials[field]) {
                throw new BadRequestError(`missing ${field} in request.body`);
            }
        });

        const user = await User.fetchUserByEmail(credentials.email);
        if (user) {
            const isValid = await bcrypt.compare(
                credentials.password,
                user.password
            );
            if (isValid) {
                return User.makeUser(user);
            }
        }

        throw new UnauthorizedError("Bad password/email");
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided");
        }

        const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
            email.toLowerCase(),
        ]);

        return result.rows[0];
    }

    static async fetchUserByUsername(username) {
        if (!username) {
            throw new BadRequestError("No username provided");
        }

        const result = await db.query(
            `SELECT * FROM users WHERE username = $1`,
            [username]
        );

        return result.rows[0];
    }

    static async fetchUserByUserId(userId) {
        if (!userId) {
            throw new BadRequestError("No user id given in req.params");
        }

        const result = await db.query(`SELECT * FROM users WHERE id = $1`, [
            userId,
        ]);

        return result.rows[0];
    }
}

module.exports = User;
