"use strict";

const User = require("../../models/user/user");
const UserStorage = require("../../models/user/userStorage");

const Friends = require("../../models/user/friends");
const FriendsStorage = require("../../models/user/friendsStorage");

//로그인 회원가입
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

  register: (req, res) => {
    const user = new User(req.body);
    const response = user.register(req.body);
    return res.json(response);
  },
};

const relation = {
  send: (req, res) => {
    const request = new Friends(req.body);
    const response = request.send(req.body);
    return res.json(response);
  },
};

module.exports = {
  sign,
  relation,
};
