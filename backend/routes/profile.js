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

router.get('/', requireAuthenticatedUser, async(req, res, next) => {
  try {
    const user = res.locals.user;
    const profile = await Profile.fetchProfile(user);
    res.status(200).json(profile)
  } catch(err) {
    next(err)
  }
})

router.put('/', requireAuthenticatedUser, async(req, res, next) => {
  try {
    const user = res.locals.user;
    const profile = req.body
    const updateProfile = await Profile.updateProfile(user, profile);
    res.status(201).json(updateProfile)
  } catch(err) {
    next(err)
  }
})

module.exports = router
