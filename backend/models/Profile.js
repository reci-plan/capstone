const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const User = require("./user");

class Profile {
  /** Create user profile after register */
  static async createProfile(user) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    const results = await db.query(
      `
      INSERT INTO profile (user_id)
      VALUES ((SELECT id FROM users WHERE username = $1))
      RETURNING id, user_id AS "userId";
    `,
      [user.username]
    );

    return results.rows[0];
  }

  /** Fetch user profile */
  static async fetchProfile(user) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    const results = await db.query(
      `
      SELECT * FROM profile
      WHERE user_id = (SELECT id FROM users WHERE username = $1)
    `,
      [user.username]
    );

    return results.rows[0];
  }

  /** Fetch all profiles except user */
  static async fetchAllProfiles(user) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    const users = await db.query(`
        SELECT * FROM users 
        WHERE username != $1
      `, [user.username]
    );

    const profiles = await db.query(`
        SELECT * FROM profile 
        WHERE user_id != (SELECT id from users where username = $1)
      `, [user.username]
    );

    return [users.rows, profiles.rows];
  }

  /** Update user profile
   * If the column value is null or empty, then keep original information
   * If the column value is valid, then change it
   */
  static async updateProfile(user, profile) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    if (profile.email) {
      if (profile.email.indexOf("@") <= 0) {
        throw new BadRequestError("Invalid email.");
      }
    }

    var hashedPassword = "";
    if (profile.password) {
      hashedPassword = await bcrypt.hash(profile.password, BCRYPT_WORK_FACTOR);
    }

    // var cloudinary = require('cloudinary').v2;
    // cloudinary.uploader.upload(`${profile.image_url}`, {
    //   public_id: `${profile.id}`,
    //   overwrite: true
    // }, function(error, result) {
    //   console.log(result, error)
    // });

    // const image_url = result;
    
    const userResults = await db.query(`
      UPDATE users
      SET first_name = CASE WHEN COALESCE($1, '') = '' THEN first_name ELSE $1 END,
          last_name = CASE WHEN COALESCE($2, '') = '' THEN last_name ELSE $2 END,
          username = CASE WHEN COALESCE($3, '') = '' THEN username ELSE $3 END,
          email = CASE WHEN COALESCE($4, '') = '' THEN email ELSE $4 END,
          password = CASE WHEN COALESCE($5, '') = '' THEN password ELSE $5 END
      WHERE id = (SELECT id from users WHERE username = $6)
      RETURNING id, email, first_name, last_name, username;
    `,
      [
        profile.first_name,
        profile.last_name,
        profile.username,
        profile.email,
        hashedPassword,
        user.username,
      ]
    );
    const profileResults = await db.query(
      `
      UPDATE profile
      SET image_url = CASE WHEN COALESCE($1, '') = '' THEN image_url ELSE $1 END,
          region = CASE WHEN COALESCE($2, '') = '' THEN region ELSE $2 END,
          short_bio = CASE WHEN COALESCE($3, '') = '' THEN short_bio ELSE $3 END,
          fav_flavors = $4
      WHERE user_id = (SELECT id from users WHERE username = $5)
      RETURNING id, user_id, image_url, region, short_bio, fav_flavors;
    `,
      [
        profile.image_url,
        profile.region,
        profile.short_bio,
        profile.fav_flavors,
        user.username,
      ]
    );
    const userResult = User.makeUser(userResults.rows[0]);
    return [userResult, profileResults.rows[0]];
  }

  static async getPublicProfileInformation(user_id) {
    console.log(user_id);
    const results = await db.query(`SELECT * FROM users WHERE id = $1`, [
      user_id,
    ]);

    return results.rows[0];
  }
}

module.exports = Profile;
