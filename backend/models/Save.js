const db = require("../db");

const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Save {
  static async fetchSavedRecipes(user) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    const query = `
      SELECT * FROM all_recipes
      JOIN saved_recipes ON all_recipes.id = saved_recipes.recipe_id
      WHERE user_id = (SELECT id FROM users WHERE username = $1)
      ORDER BY saved_recipes.date DESC
    `;

    const results = await db.query(query, [user.username]);

    return results.rows;
  }

  // Recipe is an object.
  static async saveRecipe(user, recipe) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    if (!recipe) {
      throw new BadRequestError("no recipe in request.body");
    }

    if (!recipe.hasOwnProperty("title")) {
      throw new BadRequestError(`Missing title in request body.`);
    }

    console.log("The recipe", recipe);
    const isExisting = await db.query(
      `SELECT * FROM all_recipes
      JOIN saved_recipes ON all_recipes.id = saved_recipes.recipe_id
      WHERE recipe_id = (SELECT id FROM all_recipes WHERE id = $1) `,
      [recipe.id]
    );
    console.log("isExisting.rows: ", isExisting.rows);
    if (isExisting.rows.length > 0) {
      throw new BadRequestError("Cannot insert duplicate.");
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

  static async checkRecipe(user, recipeId) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    if (!recipeId) {
      throw new BadRequestError("No recipeId in req.params");
    }

    const results = await db.query(
      `
        SELECT * FROM saved_recipes
        WHERE recipe_id = $1 AND user_id = (SELECT id FROM users WHERE username = $2)
      `, [recipeId, user.username]
    )

    console.log(results.rows[0])
    if (results.rows[0]) {
      console.log(recipeId.title, true)
      return true
    }
    console.log(recipeId.title, false)
    return false
  }
}

module.exports = Save;
