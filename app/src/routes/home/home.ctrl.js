"use strict";

const User = require("../../models/user");
const UserStorage = require("../../models/userStorage");

//로그인 회원가입
const sign = {
  login: (req, res) => {
    return res.json({ sucess: true });
  },
  register: (req, res) => {
    const user = new User();
    user.register(req.body);
    return res.json({ sucess: true });
  },
};

module.exports = {
  sign,
};
