"use strict";

const User = require("../../models/user/user");
const UserStorage = require("../../models/user/userStorage");

//로그인 회원가입
const sign = {
  login: (req, res) => {
    return res.json({ sucess: true });
  },
  register: (req, res) => {
    const user = new User();
    const response = user.register();
    return res.json(response);
  },
};

module.exports = {
  sign,
};
