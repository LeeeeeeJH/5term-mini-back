"use strict";

// const router = express.Router();
const User = require("../../models/user/user");

const sign = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login(req.body);

    return res.json(response);
  },

  check: async (req, res) => {
    const user = new User(req.body);
    const response = await user.check(req.body);

    return res.json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register(req.body);

    return res.json(response);
  },
};

module.exports = { sign };
