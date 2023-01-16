"use strict";

const User = require("../../models/user/user");
const UserStorage = require("../../models/user/userStorage");

//로그인 회원가입
const sign = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login(req.body);
    return res.json(response);
  },

  idCheck: async (req, res) => {
    const user = new User(req.body);
    const response = await user.idCheck(req.body);
    return res.json(response);
  },

  nicknameCheck: async (req, res) => {
    const user = new User(req.body);
    const response = await user.nicknameCheck(req.body);
    return res.json(response);
  },

  register: (req, res) => {
    const user = new User(req.body);
    const response = user.register(req.body);
    return res.json(response);
  },
};

module.exports = {
  sign,
};
