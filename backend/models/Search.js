const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Search {
  // search recipe by keyword query
  static async fetchRecipeByQuery(query) {
    // include results where title matches title or description
    const results = await db.query(`
      SELECT * FROM all_recipes
      WHERE title LIKE $1
        OR description LIKE $1
    `, [query])

    return results.rows
  }

  // search recipe by category [RECEIVED AS A CATCODE]
  static async fetchRecipesByCategory(category) {
    console.log(category)
    const results = await db.query(`
      SELECT id AS option FROM all_recipes 
      WHERE (category & $1 = $1) 
    `, [category])
    console.log("hi", results.rows)

    return results;
  }
}

module.exports = Search