const express = require("express");
const router = express.Router();
const security = require("../middleware/security");
const User = require("../models/user");
const { createUserJwt } = require("../utils/tokens");

router.get("/fetchCustomUser/:userId", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const theUser = await User.fetchUserByUserId(userId);
        console.log(theUser);
        return res.status(200).json(theUser);
    } catch (e) {
        next(e);
    }
});

// In INSOMINA: Headers -> Authorization: Bearer ${Insert token here}
router.get(
    "/user",
    security.requireAuthenticatedUser,
    async (req, res, next) => {
        try {
            const { username } = res.locals.user;
            const user = await User.fetchUserByUsername(username);
            const publicUser = User.makeUser(user);
            return res.status(200).json({ user: publicUser });
        } catch (err) {
            next(err);
        }
    }
);

router.post("/register", async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.login(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
