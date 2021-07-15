const db = require("../db");

class Recipe {
    static async getAllRecipes() {
        const results = await db.query(`SELECT * FROM all_recipes`);
        return results.rows;
    }

    /**
     * 0001
     * 0011
     * 0000
     * 0011
     * 1010
     * 1000
     */
    static async extractInfo(data) {
        const arr = [];
        console.log(data.results)
        const category = [];

        data.results.forEach(async (r, idx) => {
            
            console.log()
            category.push(
                // vegetarian: r.vegetarian,
                // vegan: r.vegan,
                // glutenFree: r.glutenFree,
                // dairyFree: r.dairyFree,
                (2*(2*(2*(r.vegetarian ? 1 : 0) + (r.vegan ? 1 : 0)) + (r.glutenFree ? 1 : 0)) + (r.dairyFree ? 1 : 0))
                
            );

            arr.push({
                id: r.id,
                title: r.title,
                expense: parseInt(r.pricePerServing),
                prep_time: parseInt(r.readyInMinutes),
                // description: r.instructions,
                description: "placeholder",
                image_url: r.image ? r.image : "no_image",
                rating: parseInt(r.spoonacularScore),
            });
            
        });

        // console.log("supposed to look like this:", [category[0]]);
        console.log(category);
        let result_arr = [];
        for (let i = 0; i < arr.length; i++) {
            const queryString = `
            INSERT INTO all_recipes (title, category, image_url, prep_time, description, rating, expense)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id, title, category, image_url, prep_time, description, rating, expense
            `;
            const results = await db.query(queryString, [
                arr[i].title,
                [category[i]],
                arr[i].image_url,
                arr[i].prep_time,
                arr[i].description,
                arr[i].rating,
                arr[i].expense,
            ]);
            result_arr.push(results.rows);
        }
        // console.log(result_arr[0][0].category);
        return result_arr;
    }
}

module.exports = Recipe;
