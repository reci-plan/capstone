const express = require("express");
const router = express.Router();
const { requireAuthenticatedUser } = require("../middleware/security");
const Community = require("../models/Community");

router.get("/", async (req, res, next) => {
  try {
    const allPosts = await Community.getPosts();
    res.status(200).json({ allPosts });
  } catch (e) {
    next(e);
  }
});

router.post("/", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = res.locals.user;
    const post = req.body;
    const new_post = await Community.newPost(user, post);
    res.status(200).json({ new_post });
  } catch (e) {
    next(e);
  }
});

router.delete("/", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const user = res.locals.user;
    const post = req.body;
    const deleted_post = await Community.deletePost(user, post);
    res.status(200).json({ deleted_post });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
