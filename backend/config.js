require("dotenv").config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const API_KEY = process.env.API_KEY;
const BASE_RECIPES_URL = "https://api.spoonacular.com/recipes";

module.exports = { PORT, API_KEY, BASE_RECIPES_URL };
