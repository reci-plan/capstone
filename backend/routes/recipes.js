const express = require("express");
const router = express.Router();
const axios = require("axios");

const { API_KEY, API_KEY2, BASE_RECIPES_URL } = require("../config");

const Recipe = require("../models/Recipe");

// router.get("/testing/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const options = {
//       method: "GET",
//       url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
//       headers: {
//         "x-rapidapi-key": API_KEY,
//         "x-rapidapi-host":
//           "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//       },
//     };

//     axios
//       .request(options)
//       .then(function (response) {
//         res.status(200).json(response.data);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   } catch (e) {
//     next(e);
//   }
// });

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
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex",
      params: {
        limitLicense: "<REQUIRED>",
        offset: "1",
        number: "100",
        minIron: "0",
        minCalcium: "0",
        maxVitaminB2: "1000",
        maxMagnesium: "1000",
        minPotassium: "0",
        maxVitaminB6: "1000",
        intolerances: "peanut, shellfish",
        maxVitaminB5: "1000",
        minFolicAcid: "0",
        minVitaminA: "0",
        maxSodium: "1000",
        maxSugar: "1000",
        maxVitaminA: "5000",
        maxFluoride: "1000",
        minFluoride: "0",
        minVitaminB1: "0",
        minCholine: "0",
        ranking: "2",
        minFat: "5",
        maxVitaminB1: "1000",
        addRecipeInformation: "true",
        minVitaminB12: "0",
        maxSelenium: "1000",
        minZinc: "0",
        minFolate: "0",
        maxManganese: "1000",
        maxVitaminB12: "1000",
        maxPotassium: "1000",
        maxIron: "1000",
        minSelenium: "0",
        minVitaminK: "0",
        maxFiber: "1000",
        minSodium: "0",
        maxCopper: "1000",
        minCalories: "150",
        maxCholine: "1000",
        minCholesterol: "0",
        maxVitaminE: "1000",
        minProtein: "5",
        minVitaminB3: "0",
        minVitaminB6: "0",
        maxIodine: "1000",
        excludeIngredients: "coconut, mango",
        maxProtein: "100",
        minMagnesium: "0",
        minCarbs: "5",
        cuisine: "american",
        maxCaffeine: "1000",
        maxSaturatedFat: "50",
        maxVitaminK: "1000",
        minAlcohol: "0",
        minIodine: "0",
        query: "burger",
        minSaturatedFat: "0",
        includeIngredients: "onions, lettuce, tomato",
        minVitaminE: "0",
        maxCalcium: "1000",
        minFiber: "0",
        minVitaminC: "0",
        maxZinc: "1000",
        maxCalories: "1500",
        maxAlcohol: "1000",
        minPhosphorus: "0",
        minVitaminD: "0",
        minVitaminB2: "0",
        minSugar: "0",
        maxFolate: "1000",
        type: "main course",
        maxCholesterol: "1000",
        maxVitaminB3: "1000",
        minCaffeine: "0",
        minVitaminB5: "0",
        maxFolicAcid: "1000",
        maxCarbs: "100",
        maxVitaminD: "1000",
        equipment: "pan",
        maxFat: "100",
        minCopper: "0",
        maxVitaminC: "1000",
        maxPhosphorus: "1000",
        minManganese: "0",
      },
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const recipes = Recipe.extractInfo(response.data);
        res.status(200).json({ result: response.data });
      })
      .catch(function (error) {
        console.error(error);
      });
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
