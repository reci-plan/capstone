const express = require("express");
const router = express.Router();
const { requireAuthenticatedUser } = require("../middleware/security");

const Profile = require("../models/Profile");

router.post('/create', requireAuthenticatedUser, async(req, res, next) => {
  try {
    const user = res.locals.user;
    const profile = await Profile.createProfile(user);
    res.status(201).json(profile)
  } catch(err) {
    next(err)
  }
})




module.exports = router
