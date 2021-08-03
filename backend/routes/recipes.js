const express = require("express");
const router = express.Router();
const axios = require("axios");

const { API_KEY, API_KEY2, BASE_RECIPES_URL } = require("../config");

const Recipe = require("../models/Recipe");

router.get("/", (req, res) => {
  res.status(201).json({ hello: "hello" });
});

// get api complexsearch endpoint then insert it to our all_recipes
router.get("/getRecipes", async (req, res, next) => {
  // Spoonacular
  // try {
  //   // convert array to string with a comma in between each element
  //   const typesToString = [
  //     "breakfast",
  //     "main course",
  //     "side dish",
  //     "salad",
  //     "appetizer",
  //     "soup",
  //     "finger food",
  //     "drink",
  //   ].join(", ");

  //   const result = await axios.get(`
  //     ${BASE_RECIPES_URL}/complexSearch?apiKey=${API_KEY2}&instructionsRequired=true&addRecipeInformation=true&maxReadyTime=60&sort=price&sortDirection=asc&limitLicense=true&number=5&offset=500&type=${typesToString}
  //   `);
  //   const recipes = await Recipe.extractInfo(result.data);
  //   // res.status(201).json({ result: recipes });
  //   res.status(201).json({ result: result.data });
  // } catch (e) {
  //   next(e);
  // }

  // Rapid api

  try {
    // const result_arr = [];
    // let offset = 0;
    // let number = 100;

    // for (let i = 0; i < 5; i++) {
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex",
      params: {
        limitLicense: "true",
        offset: 0,
        number: 100,
        addRecipeInformation: "true",
      },
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(async function (response) {
        const recipes = await Recipe.extractInfo(response.data);
        // console.log(recipes);
        res.status(200).json({ result: recipes });
      })
      .catch(function (error) {
        console.error(error);
      });

    // offset += 1;
    // number += 100;
    // }
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

router.get("/getMoreInfo/:recipeId", async (req, res, next) => {
  // Spoonacular api
  // try {
  //   const { recipeId } = req.params;
  //   const recipeInfo = await axios.get(
  //     `${BASE_RECIPES_URL}/${recipeId}/information?apiKey=${API_KEY2}&includeNutrition=true`
  //   );
  //   res.status(200).json(recipeInfo.data);
  // } catch (err) {
  //   next(err);
  // }
  // Rapid api
  try {
    const { recipeId } = req.params;
    const options = {
      method: "GET",
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`,
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (e) {
    next(e);
  }
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
