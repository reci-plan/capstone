const db = require("../db");
class Save {
  static async saveRecipe(user, recipe) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    if (!recipe.hasOwnProperty("title")) {
      throw new BadRequestError(`Missing title in request body.`);
    }

    const results = await db.query(
      `
      INSERT INTO saved_recipes (user_id, recipe_id)
      VALUES ((SELECT id FROM users WHERE username = $1), (SELECT id FROM all_recipes WHERE title = $2))
      RETURNING id, user_id AS "userId", recipe_id AS "recipeId", date;
    `,
      [user.username, recipe.title]
    );

    return results.rows[0];
  }
}

module.exports = Save;
