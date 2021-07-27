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

//instructionsRequired=true&addRecipeInformation=true&maxReadyTime=60&sort=price&sortDirection=asc&limitLicense=true&number=100&offset=500&type=${typesToString}
var options = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
  params: {
    instructionsRequired: true,
    addRecipeInformation: true,
    maxReadyTime: 60,
    sort: 'price',
    sortDirection: 'asc',
    limitLicense: true,
    number: 1000,
    offset: 500,
    type: `${typesToString}`
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
