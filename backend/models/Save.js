const db = require("../db");

const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class Save {
  static async fetchSavedRecipes(user) {
    if (!user) {
      throw new UnauthorizedError(`No user logged in.`);
    }

    const query = `
      SELECT * FROM saved_recipes
      JOIN all_recipes ON all_recipes.id = saved_recipes.recipe_id
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

    const isExisting = await Save.checkRecipe(user, recipe.id);
    if (isExisting) {
      throw new BadRequestError("Cannot insert duplicate.");
    }

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

    // TRY SAVE MEAL PLAN (mealPlan is an object)
    static async saveMealPlan(user, mealPlan) {
      const requiredFields = [
        "title"
    ];

      requiredFields.forEach((field) => {
        if (!mealPlan[field]) {
            throw new BadRequestError(`missing ${field} in request.body`);
        }
    });

      if (!user) {
        throw new UnauthorizedError(`No user logged in.`);
      }
  
      if (!mealPlan) {
        throw new BadRequestError("no meal plan in request.body");
      }
  
      if (!mealPlan.hasOwnProperty("title")) {
        throw new BadRequestError(`Missing title in request body.`);
      }
  
      const results = await db.query(
        `
        INSERT INTO saved_meal_plans (user_id, title, recipe_id1, recipe_id2, recipe_id3, recipe_id4, meal_name1, meal_name2, meal_name3, meal_name4, time1, time2, time3, time4)
        VALUES ((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING id, user_id, title, recipe_id1, recipe_id2, recipe_id3, recipe_id4, meal_name1, meal_name2, meal_name3, meal_name4, time1, time2, time3, time4, date;
      `,
        [user.username, mealPlan.title, mealPlan.recipe_id1, mealPlan.recipe_id2, mealPlan.recipe_id3, mealPlan.recipe_id4, mealPlan.meal_name1, mealPlan.meal_name2, mealPlan.meal_name3, mealPlan.meal_name4, mealPlan.time1, mealPlan.time2, mealPlan.time3, mealPlan.time4]
      );
  
      return results.rows[0];
    }

    static async fetchSavedMealPlans(user) {
      if (!user) {
        throw new UnauthorizedError(`No user logged in.`);
      }
  
      const query = `
        SELECT * FROM saved_meal_plans
        WHERE user_id = (SELECT id FROM users WHERE username = $1)
        ORDER BY saved_meal_plans.date DESC
      `;
  
      const results = await db.query(query, [user.username]);
  
      return results.rows;
    }
}

module.exports = Save;
