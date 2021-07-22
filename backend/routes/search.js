const express = require('express')
const router = express.Router()
const Search = require('../models/search')

router.get('/', async(req, res, next) => {
  try {
    const query = req.body.query
    const recipes = await Search.fetchRecipeByQuery(query)
    res.status(200).json({ recipes })
  } catch(err) {
    next(err)
  }
})

router.get('/:category', async(req, res, next) => {
  try {
    const category = req.params.category
    const recipes = await Search.fetchRecipesByCategory(category)
    res.status(200).json({ recipes })
  } catch(err) {
    next(err)
  }
})

module.exports = router