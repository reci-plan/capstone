const express = require("express");
const router = express.Router();
const Save = require("../models/Save");
const { requireAuthenticatedUser } = require("../middleware/security");

router.get("/recipes", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user;
        const savedRecipes = await Save.fetchSavedRecipes(user);
        res.status(200).json({ savedRecipes });
    } catch (err) {
        next(err);
    }
});

router.post("/recipe", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user;
        // const recipe = req.body.recipe;
        const recipe = req.body;
        const saveRecipe = await Save.saveRecipe(user, recipe);
        res.status(201).json({ saveRecipe });
    } catch (err) {
        next(err);
    }
});

router.delete("/recipe", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user;
        const recipe = req.body;
        const unsaveRecipe = await Save.unsaveRecipe(user, recipe);
        res.status(200).json({ unsaveRecipe });
    } catch (err) {
        next(err);
    }
});

router.get('/check/:recipeId', requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user
        const recipeId = req.params.recipeId
        const checkRecipe = await Save.checkRecipe(user, recipeId)
        res.status(200).json(checkRecipe)
    } catch(err) {
        next(err)
    }
  })

  router.post("/recipe/x", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user;
        // const recipe = req.body.recipe;
        const mealPlan = req.body;
        const saveMealPlan = await Save.saveMealPlan(user, mealPlan);
        res.status(201).json({ saveMealPlan });
    } catch (err) {
        next(err);
    }
});

router.get("/mealPlans", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user;
        const savedMealPlans = await Save.fetchSavedMealPlans(user);
        res.status(200).json({ savedMealPlans });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
