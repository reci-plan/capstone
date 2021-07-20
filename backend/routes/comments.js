const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");

router.get("/:recipeId", async (req, res, next) => {
  try {
    const user = res.locals.user;
    const { recipeId } = req.params;
    const getAllComments = await Comment.getComments(user, recipeId);
    res.status(201).json({ getAllComments });
  } catch (e) {
    next(e);
  }
});

router.post("/:recipeId", async (req, res, next) => {
  try {
    const user = res.locals.user;
    const { recipeId } = req.params;
    const { comment } = req.body;
    const publishComment = await Comment.postComment(user, comment, recipeId);
    res.status(201).json({ publishComment });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
