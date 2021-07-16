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

    const isExisting = await Save.checkExistingRecipe(user, recipe);
    if (isExisting.length > 0) {
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

  static async deleteRecipe(user, recipe) {
    if (!user) {
      throw new UnauthorizedError("No user logged in");
    }

    if (!recipe) {
      throw new BadRequestError(
        "No recipe given under deleteRecipe function in models."
      );
    }

    // if (!recipe.hasOwnProperty("title")) {
    //   throw new BadRequestError(`Missing title in request body.`);
    // }

    const isExisting = await Save.checkExistingRecipe(user, recipe);
    console.log(isExisting);
    if (isExisting.length === 0) {
      throw new BadRequestError(
        "You cannot delete this item, it was not even saved in the first place."
      );
    }

    const query = `DELETE FROM saved_recipes
    WHERE recipe_id = (SELECT id FROM all_recipes WHERE title = $1)`;

    const results = await db.query(query, [recipe.title]);

    return results.rows[0];
  }

  static async checkExistingRecipe(user, recipe) {
    console.log("recipe", recipe);
    const results = await db.query(
      `SELECT * FROM all_recipes
      JOIN saved_recipes ON all_recipes.id = saved_recipes.recipe_id
      JOIN users ON users.id = saved_recipes.user_id
      WHERE recipe_id = (SELECT id FROM all_recipes WHERE title = $1) AND
      user_id = (SELECT id FROM users WHERE username = $2)
       `,
      [recipe.title, user.username]
    );
    console.log("Results.rows", results.rows);
    return results.rows;
  }
}

module.exports = Save;
