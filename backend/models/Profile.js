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

    console.log(results.rows)
    return results.rows[0]
  }
}

module.exports = Profile