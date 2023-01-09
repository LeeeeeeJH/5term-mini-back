"use strict";

const { response } = require("express");
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

const info = {
  getInfo : async (req,res) => {
    const user = new User();
    const response = await user.getInfo(req.body);
    
    return res.json(response)
  }
}
module.exports = {
  sign,info
};
