const express = require("express");
const router = express.Router();
const { requireAuthenticatedUser } = require("../middleware/security");
const Community = require("../models/Community");

router.get("/getPosts", async (req, res, next) => {
  try {
    const allPosts = await Community.getPosts();
    res.status(200).json({ allPosts });
  } catch (e) {
    next(e);
  }
});

router.get(
  "/getPost/:postId",
  requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const user = res.locals.user;
      const { postId } = req.params;
      const specific_post = await Community.fetchPostById(user, postId);
      res.status(200).json({ specific_post });
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/updatePost/:postId",
  requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const user = res.locals.user;
      const post = req.body;
      const updatedPost = await Community.updatePost(user, post);
      res.status(200).json(updatedPost);
    } catch (e) {
      next(e);
    }
  }
);

router.post("/newPost", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = res.locals.user;
    const post = req.body;
    const new_post = await Community.newPost(user, post);
    res.status(200).json({ new_post });
  } catch (e) {
    next(e);
  }
});

router.delete(
  "/deletePost",
  requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const user = res.locals.user;
      const post = req.body;
      const deleted_post = await Community.deletePost(user, post);
      res.status(200).json({ deleted_post });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/postRating/:postId",
  requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const user = res.locals.user;
      const { postId } = req.params;
      const { rating } = req.body;
      const postRating = await Community.ratingForPost(rating, user, postId);
      res.status(200).json({ postRating });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
