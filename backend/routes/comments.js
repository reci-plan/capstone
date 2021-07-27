const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");

router.post("/getOwnerOfComment", async (req, res, next) => {
  try {
    const user = res.locals.user;
    const comment = req.body;
    const ownerOfComment = await Comment.getOwnerOfComment(user, comment);
    res.status(201).json({ ownerOfComment });
  } catch (e) {
    next(e);
  }
});

router.get("/getComment/:recipeId", async (req, res, next) => {
  try {
    const user = res.locals.user;
    const { recipeId } = req.params;
    const getAllComments = await Comment.getComments(user, recipeId);
    res.status(201).json({ getAllComments });
  } catch (e) {
    next(e);
  }
});

router.post("/postComment/:recipeId", async (req, res, next) => {
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

router.delete("/deleteComment", async (req, res, next) => {
  try {
    const user = res.locals.user;
    const { id } = req.body;
    const idToDelete = await Comment.deleteComment(user, id);
    res.status(201).json({ idToDelete });
  } catch (e) {
    next(e);
  }
});

router.put("/editComment", async (req, res, next) => {
  try {
    const user = res.locals.user;
    const comment = req.body;
    const idToModify = await Comment.editComment(user, comment);
    res.status(200).json({ idToModify });
  } catch (e) {
    next(e);
  }
});

router.put("/likeComment", async (req, res, next) => {
  try {
    const user = res.locals.user;
    const comment = req.body;
    const likesToModify = await Comment.likeTheComment(user, comment);
    res.status(200).json({ likesToModify });
  } catch (e) {
    next(e);
  }
});

router.put("/unlikeComment", async (req, res, next) => {
  try {
    const user = res.locals.user;
    const comment = req.body;
    const likesToModify = await Comment.unlikeTheComment(user, comment);
    res.status(200).json({ likesToModify });
  } catch (e) {
    next(e);
  }
});

router.post("/checkCommentOwner", async (req, res, next) => {
  try {
    const user = res.locals.user;
    const comment = req.body;
    const checkTheCommentOwner = await Comment.getCommentOwner(user, comment);
    res.status(200).json({ checkTheCommentOwner });
  } catch (e) {
    next(e);
  }
});

router.get("/checkIfUserIsInLikes/:api_id", async (req, res, next) => {
  try {
    const user = res.locals.user;
    const { api_id } = req.params;
    const isUserInLikes = await Comment.checkIfUserIsInLikes(user, api_id);
    res.status(200).json({ isUserInLikes });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
