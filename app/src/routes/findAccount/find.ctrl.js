"use strict";

const FindAccount = require("../../models/user/findAccount");

const findAccount = {
  id: async (req, res) => {
    const find = new FindAccount();
    const result = await find.id(req.body);

    return res.json(result);
  },
  password: async (req, res) => {
    const find = new FindAccount();
    const result = await find.password(req.body);

    return res.json(result);
  },
};

module.exports = { findAccount };
