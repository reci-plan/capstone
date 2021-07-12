const express = require("express");
const router = express.Router();
const axios = require("axios");

const { API_KEY, BASE_RECIPES_URL } = require("../config");

router.get("/", (req, res) => {
  res.status(201).json({ hello: "hello" });
});

// router.get("/search/:food", async (req, res, next) => {
//   try {
//     const { food } = req.params;
//     const result = await axios.get(
//       `${BASE_RECIPES_URL}/complexSearch?apiKey=${API_KEY}&query=${food}?`
//     );

//     res.status(201).json({ results: result.data });
//   } catch (e) {
//     next(e);
//   }
// });

router.get("/search/:food", async (req, res, next) => {
  try {
    const { food } = req.params;

    const result = await axios.get(`
      ${BASE_RECIPES_URL}/complexSearch?apiKey=${API_KEY}&query=${food}&instructionsRequired=true&addRecipeInformation=true&cuisine=American,Italian&maxReadyTime=60&sort=price&sortDirection=asc&limitLicense=true
    `);

    res.status(201).json({ results: result.data });
  } catch (e) {
    next(e);
  }
});

router.get("/summarize/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await axios.get(
      `${BASE_RECIPES_URL}/${id}/summary?apiKey=${API_KEY}`
    );

    res.status(201).json({ results: result.data });
  } catch (e) {
    next(e);
  }
});

router.get("/similar/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await axios.get(
      `${BASE_RECIPES_URL}/${id}/similar?apiKey=${API_KEY}`
    );

    res.status(201).json({ results: result.data });
  } catch (e) {
    next(e);
  }
});

router.get("/stats/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await axios.get(
      `${BASE_RECIPES_URL}/${id}/tasteWidget.json?apiKey=${API_KEY}`
    );

    res.status(201).json({ results: result.data });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
