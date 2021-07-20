const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const { requireAuthenticatedUser } = require("../middleware/security");

router.get("/:recipeId", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { recipeId } = req.params;
        const getAllComments = await Comment.getComments(user, recipeId);
        res.status(200).json({ getAllComments });
    } catch (err) {
        next(err);
    }
});

router.post("/:recipeId", requireAuthenticatedUser, async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { recipeId } = req.params;
        const { comment } = req.body;
        const postComment = await Comment.postComment(user, comment, recipeId);
        res.status(201).json({ postComment });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
