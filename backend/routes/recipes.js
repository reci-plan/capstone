const express = require("express");
const router = express.Router();
const axios = require("axios");

const { API_KEY, BASE_RECIPES_URL, RAPID_KEY, RAPID_HOST } = require("../config");

const Recipe = require("../models/Recipe");

router.get("/", (req, res) => {
  res.status(201).json({ hello: "hello" });
});

router.get("/search/:food", async (req, res, next) => {
  try {
    const { food } = req.params;
    const result = await axios.get(
      `${BASE_RECIPES_URL}/complexSearch?apiKey=${API_KEY}&query=${food}&addRecipeInformation=true`
    );

    res.status(201).json({ results: result.data });
  } catch (e) {
    next(e);
  }
});

// get api complexsearch endpoint then insert it to our all_recipes
router.get("/getRecipes", async (req, res, next) => {
  try {
    // convert array to string with a comma in between each element
    const typesToString = [
      "breakfast",
      "main course",
      "side dish",
      "salad",
      "appetizer",
      "soup",
      "finger food",
      "drink",
    ].join(", ");

    const result = await axios.get(`
      ${BASE_RECIPES_URL}/complexSearch?apiKey=${API_KEY}&instructionsRequired=true&addRecipeInformation=true&maxReadyTime=60&sort=price&sortDirection=asc&limitLicense=true&number=100&offset=500&type=${typesToString}
    `);
    const recipes = await Recipe.extractInfo(result.data);
    // res.status(201).json({ result: recipes });
    res.status(201).json({ result: result.data });
  } catch (e) {
    next(e);
  }
});

// select all from all_recipes and return it
router.get("/logRecipes", async (req, res, next) => {
  try {
    const result = await Recipe.getAllRecipes();
    return res.status(201).json({ recipes: result });
  } catch (e) {
    next(e);
  }
});

router.get('/:recipeId', async (req, res, next) => {
  try {
    const { recipeId } = req.params
    const recipeInfo = await axios.get(`${BASE_RECIPES_URL}/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`)
    res.status(200).json(recipeInfo.data)
  } catch(err) {
    next(err)
  }
})

var options = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
  params: {
    maxVitaminB1: '1000',
    minPotassium: '0',
    minIron: '0',
    maxVitaminB5: '1000',
    minCalcium: '0',
    minFolicAcid: '0',
    maxSugar: '1000',
    maxVitaminB2: '1000',
    maxVitaminB6: '1000',
    maxSodium: '1000',
    minFolate: '0',
    minVitaminK: '0',
    minFluoride: '0',
    maxVitaminB12: '1000',
    maxVitaminA: '5000',
    ranking: '2',
    number: '10',
    minZinc: '0',
    maxVitaminK: '1000',
    maxMagnesium: '1000',
    offset: '0',
    maxManganese: '1000',
    maxFluoride: '1000',
    maxSelenium: '1000',
    minProtein: '5',
    minAlcohol: '0',
    minCalories: '150',
    minCholine: '0',
    maxIodine: '1000',
    maxCopper: '1000',
    minFat: '5',
    minVitaminD: '0',
    maxCholine: '1000',
    excludeIngredients: 'coconut, mango',
    maxIron: '1000',
    maxCholesterol: '1000',
    minSelenium: '0',
    minVitaminB1: '0',
    minVitaminB6: '0',
    maxPotassium: '1000',
    intolerances: 'peanut, shellfish',
    maxFat: '100',
    minVitaminC: '0',
    includeIngredients: 'onions, lettuce, tomato',
    maxPhosphorus: '1000',
    maxFolate: '1000',
    minMagnesium: '0',
    maxCaffeine: '1000',
    minSaturatedFat: '0',
    maxVitaminE: '1000',
    minSodium: '0',
    maxVitaminC: '1000',
    minVitaminA: '0',
    minVitaminB3: '0',
    type: 'main course',
    maxSaturatedFat: '50',
    minCholesterol: '0',
    minFiber: '0',
    maxCarbs: '100',
    minVitaminB12: '0',
    maxAlcohol: '1000',
    maxCalories: '1500',
    maxCalcium: '1000',
    maxZinc: '1000',
    minPhosphorus: '0',
    maxVitaminB3: '1000',
    minVitaminE: '0',
    maxVitaminD: '1000',
    maxProtein: '100',
    minCarbs: '5',
    maxFiber: '1000',
    minCopper: '0',
    minCaffeine: '0',
    minVitaminB5: '0',
    query: 'burger',
    cuisine: 'american',
    minManganese: '0',
    minSugar: '0',
    minIodine: '0',
    minVitaminB2: '0',
    maxFolicAcid: '1000',
    equipment: 'pan'
  },
  headers: {
    'x-rapidapi-key': RAPID_KEY,
    'x-rapidapi-host': RAPID_HOST
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

// Ignore these
// router.get("/summarize/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await axios.get(
//       `${BASE_RECIPES_URL}/${id}/summary?apiKey=${API_KEY}`
//     );

//     res.status(201).json({ results: result.data });
//   } catch (e) {
//     next(e);
//   }
// });

// router.get("/similar/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await axios.get(
//       `${BASE_RECIPES_URL}/${id}/similar?apiKey=${API_KEY}`
//     );

//     res.status(201).json({ results: result.data });
//   } catch (e) {
//     next(e);
//   }
// });

// router.get("/stats/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await axios.get(
//       `${BASE_RECIPES_URL}/${id}/tasteWidget.json?apiKey=${API_KEY}`
//     );

//     res.status(201).json({ results: result.data });
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
