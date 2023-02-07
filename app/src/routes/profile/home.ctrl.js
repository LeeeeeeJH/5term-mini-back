"use strict";

const Profile = require("../../models/profile/profile");

const profile = {
  getProfile: async (req, res) => {
    const profile = new Profile();
    const response = await profile.readProfile(req.params);
    return res.json(response);
  },
  updateProfile: async (req, res) => {
    const profile = new Profile();
    const response = await profile.updateProfile(req.params, req.body, req.file);
    return res.json(response);
  },
};

module.exports = { profile };
