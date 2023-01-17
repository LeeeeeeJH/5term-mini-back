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

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register(req.body);
    return res.json(response);
  },
};

const relation = {
  read: async (req, res) => {
    const request = await new Friends(req.body);
    const response = request.send(req.body);
  },
  send: async (req, res) => {
    const request = await new Friends(req.body);
    const response = request.send(req.body);
    return res.json(response);
  },
  aceppt: async (req, res) => {
    const request = new Friends(req.body);
    const response = await request.aceppt(req.body);
    return res.json(response);
  },
  reject: async (req, res) => {
    console.log(req);
    const request = new Friends(req.body);
    const response = await request.reject(req.body);
    return res.json(response);
  },
};

module.exports = {
  sign,
  relation,
};
