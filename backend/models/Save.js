const db = require("../db");

const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Save {
  static async fetchSavedRecipes(user) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    // correct id is saved_recipes.recipe_id
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
    console.log(recipe);
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    if (!recipe) {
      throw new BadRequestError("no recipe in request.body");
    }

    if (!recipe.hasOwnProperty("title")) {
      throw new BadRequestError(`Missing title in request body.`);
    }

    // const isExisting = await Save.checkRecipe(user, recipe.id);
    // if (isExisting) {
    //   throw new BadRequestError("Cannot insert duplicate.");
    // }

    const results = await db.query(
      `
      INSERT INTO saved_recipes (user_id, recipe_id)
      VALUES ((SELECT id FROM users WHERE username = $1), $2)
      RETURNING id, user_id AS "userId", recipe_id AS "recipeId", date;
    `,
      [user.username, recipe.id]
    );

    return results.rows[0];
  }

  static async unsaveRecipe(user, recipe) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    if (!recipe) {
      throw new BadRequestError("no recipe in request.body");
    }

    if (!recipe.hasOwnProperty("title")) {
      throw new BadRequestError(`Missing title in request body.`);
    }

    console.log(recipe);
    const results = await db.query(
      `
        DELETE FROM saved_recipes
        WHERE recipe_id = $1 AND user_id = (SELECT id FROM users WHERE username = $2)
        RETURNING recipe_id, user_id
      `,
      [recipe.id, user.username]
    );
    // When deleting, it is passing in the wrong ID. In the profile page, the correct id is supposed to be recipe.recipe_id
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
      `,
      [recipeId, user.username]
    );

    if (results.rows[0]) {
      return true;
    }
    return false;
  }
}

module.exports = Save;
