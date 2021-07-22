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

    console.log(profile)

    var hashedPassword = "";
    if (profile.password) {
      hashedPassword = await bcrypt.hash(
        profile.password,
        BCRYPT_WORK_FACTOR
      );
    }

    const userResults = await db.query(`
      UPDATE users
      SET first_name = CASE WHEN COALESCE($1, '') = '' THEN first_name ELSE $1 END,
          last_name = CASE WHEN COALESCE($2, '') = '' THEN last_name ELSE $2 END,
          username = CASE WHEN COALESCE($3, '') = '' THEN username ELSE $3 END,
          email = CASE WHEN COALESCE($4, '') = '' THEN email ELSE $4 END,
          password = CASE WHEN COALESCE($5, '') = '' THEN password ELSE $5 END
      WHERE id = (SELECT id from users WHERE username = $6)
      RETURNING id, first_name, last_name, username, email;
    `, [profile.first_name, profile.last_name, profile.username, profile.email, hashedPassword, user.username]
    )

    const profileResults = await db.query(`
      UPDATE profile
      SET region = CASE WHEN COALESCE($1, '') = '' THEN region ELSE $1 END,
          short_bio = CASE WHEN COALESCE($2, '') = '' THEN short_bio ELSE $2 END,
          fav_flavors = CASE WHEN COALESCE($3, '') = '' THEN fav_flavors ELSE $3 END
      WHERE user_id = (SELECT id from users WHERE username = $4)
      RETURNING id, user_id, region, short_bio, fav_flavors;
    `, [profile.region, profile.short_bio, profile.fav_flavors, user.username]
    )
    
    console.log("user", userResults.rows[0])
    console.log("profile", profileResults.rows[0])
    return [userResults.rows[0], profileResults.rows[0]];
  }
}

module.exports = Profile