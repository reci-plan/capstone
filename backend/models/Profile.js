const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

class Profile {

  /** Create user profile after register */
  static async createProfile(user) {
    /* restart table schema since some info are not required */
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    const results = await db.query(`
      INSERT INTO profile (user_id)
      VALUES ((SELECT id FROM users WHERE username = $1))
      RETURNING id, user_id AS "userId";
    `, [user.username]
    )

    return results.rows[0]
  }

  /** Fetch user profile */
  static async fetchProfile(user) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    const results = await db.query(`
      SELECT * FROM profile
      WHERE user_id = (SELECT id FROM users WHERE username = $1)
    `, [user.username]
    )

    return results.rows[0];
  }

  /** Update user profile */
  static async updateProfile(user, profile) {
    console.log("update")
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    const userResults = await db.query(`
      UPDATE users
      SET first_name = ISNULL
    `)

    const profileResults = await db.query(`
      UPDATE profile
      SET 
    `)
    

    return results.rows[0];
  }
}

module.exports = Profile