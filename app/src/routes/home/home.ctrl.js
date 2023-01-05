"use strict";

const User = require("../../models/user");
const UserStorage = require("../../models/userStorage");

//로그인 회원가입
const sign = {
  login: (req, res) => {
    console.log(req.body);
    return res.json({ success: true });
  },
  register: (req, res) => {},
};

module.exports = {
  sign,
};
