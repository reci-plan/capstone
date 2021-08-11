const db = require("../db");

const dishTypes = [
    "vegetarian",
    "vegan",
    "glutenFree",
    "dairyFree",
    "breakfast",
    "main course",
    "side dish",
    "salad",
    "appetizer",
    "soup",
    "finger food",
    "drink",
];

class Recipe {
    static async getAllRecipes() {
        const results = await db.query(`SELECT * FROM all_recipes`);
        return results.rows;
    }

    static async fetchIndividualRecipe(recipeId) {
        const results = await db.query(
            `
            SELECT * FROM all_recipes
            WHERE api_id = $1
        `,
            [recipeId]
        );
        return results.rows[0];
    }

    static async extractInfo(data) {
        const arr = [];

        var catCode = 0;

        data.results.forEach(async (r, idx) => {
            catCode =
                (2 *
                    (2 * (2 * (r.vegetarian ? 1 : 0) + (r.vegan ? 1 : 0)) +
                        (r.glutenFree ? 1 : 0)) +
                    (r.dairyFree ? 1 : 0)) <<
                8;
            r.dishTypes.forEach((element) => {
                if (dishTypes.includes(element)) {
                    catCode |= 1 << (11 - dishTypes.indexOf(element));
                }
            });

            // console.log(r.analyzedInstructions[0].steps.forEach(s=>console.log(s)));

            //
            // Step[instructionsHere]
            // E.g: 1[Get sugar]

            let steps_str = "";

            r.analyzedInstructions[0].steps.forEach(
                (c, i) => (steps_str += i + 1 + "[" + c.step + "]")
            );

            console.log("steps_str: ", steps_str);

            let ingredients_str = "";
            r.missedIngredients.forEach((i, idx) => {
                if (i.amount && i.unitLong) {
                    ingredients_str +=
                        idx +
                        "[" +
                        parseFloat(i.amount).toFixed(2).toString() +
                        " " +
                        i.unitLong +
                        " " +
                        i.originalName +
                        "]";
                } else {
                    ingredients_str += idx + "[" + i.originalString + "]";
                }
            });

            // vegan
            // vegetarian
            // dairyFree
            // glutenFree

            arr.push({
                id: r.id,
                title: r.title,
                category: catCode,
                expense: parseInt(r.pricePerServing),
                prep_time: parseInt(r.readyInMinutes),
                description: r.summary,
                image_url: r.image ? r.image : "no_image",
                rating: parseInt(r.spoonacularScore),
                steps: steps_str,
                ingredients: ingredients_str,
                vegan: r.vegan,
                vegetarian: r.vegetarian,
                dairyFree: r.dairyFree,
                glutenFree: r.glutenFree,
                servings: r.servings,
            });
        });

        let result_arr = [];
        for (let i = 0; i < arr.length; i++) {
            const isExisting = await Recipe.checkIfExistingRecipe(arr[i].id);

            if (isExisting.length > 0) {
                continue;
            }

            const queryString = `
            INSERT INTO all_recipes (api_id, title, category, image_url, prep_time, description, rating, expense, ingredients, steps, vegan, vegetarian, glutenFree, dairyFree, servings)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                RETURNING id, api_id, title, category, image_url, prep_time, description, rating, expense, ingredients, steps, vegan, vegetarian, glutenFree, dairyFree, servings
            `;
            const results = await db.query(queryString, [
                arr[i].id,
                arr[i].title,
                arr[i].category,
                arr[i].image_url,
                arr[i].prep_time,
                arr[i].description,
                arr[i].rating,
                arr[i].expense,
                arr[i].ingredients,
                arr[i].steps,
                arr[i].vegan,
                arr[i].vegetarian,
                arr[i].glutenFree,
                arr[i].dairyFree,
                arr[i].servings,
            ]);
            result_arr.push(results.rows);
        }
        return result_arr;
    }

    //Pass in a shifted bit number to get categories
    static async getRecipeIdsByCategory() {
        //const results = await db.query(`SELECT id FROM all_recipes WHERE category = `);
        //return results.rows;
        return 0;
    }

    static async checkIfExistingRecipe(apiId) {
        const results = await db.query(
            `SELECT api_id, title FROM all_recipes WHERE api_id = $1`,
            [apiId]
        );

        return results.rows;
    }

    static async getIndividualRecipe(api_id) {
        const results = await db.query(
            `
            SELECT id, api_id, title, category, image_url, prep_time, description, rating, expense, ingredients, steps, vegan, vegetarian, glutenFree, dairyFree, servings FROM all_recipes
            WHERE api_id = $1
        `,
            [api_id]
        );
        return results.rows[0];
    }

    // static async
}

module.exports = Recipe;
