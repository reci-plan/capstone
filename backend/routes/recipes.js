const express = require("express");
const router = express.Router();
const axios = require("axios");

const { API_KEY, BASE_RECIPES_URL } = require("../config");

const RandomRecipe = require("../models/RandomRecipe");

router.get("/", (req, res) => {
  res.status(201).json({ hello: "hello" });
});

router.get("/search/:food", async (req, res, next) => {
  try {
    const { food } = req.params;
    const result = await axios.get(
      `${BASE_RECIPES_URL}/complexSearch?apiKey=${API_KEY}&query=${food}?`
    );

    res.status(201).json({ results: result.data });
  } catch (e) {
    next(e);
  }
});

// get api random endpoint then insert it to our all_recipes
router.get("/getRandom", async (req, res, next) => {
  try {
    const url = `
      ${BASE_RECIPES_URL}/complexSearch?apiKey=${API_KEY}&instructionsRequired=true&addRecipeInformation=true&maxReadyTime=60&sort=price&sortDirection=asc&limitLicense=true
    `
    const result = await axios.get(url);
    const arr = await RandomRecipe.extractInfo(result.data);
    res.status(201).json({ result: arr });
  } catch (e) {
    next(e);
  }
});

// select all from all_recipes and return it
router.get("/logRandom", async (req, res, next) => {
  try {
    const result = await RandomRecipe.getAllInRandomDb();
    return res.status(201).json({ recipes: result });
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
