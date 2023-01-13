"use strict";

const Diary = require("../../models/diary/diary");
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
//diary CRUD
const process = {
  createDiary: async(req, res) => {
      const diary = new Diary()
      const response = await diary.createDairy(req.params,req.body);
      return res.json(response);
  },

  deleteDiary: async(req, res) => {
      const diary = new Diary()
      const response = await diary.deleteDiary(req.params);
      return res.json(response);
  },
  updateDiary: async(req, res) => {
      const diary = new Diary()
      const response = await diary.updateDiary(req.params,req.body);
      return res.json(response);
  },
  getDiary: async(req, res) => {
    const diary = new Diary()
    const response = await diary.readDiary(req.params);
    res.send(response)
  },
  getSelectDiary: async(req, res) => {
    const diary = new Diary()
    const response = await diary.readSelectDiary(req.params);
    res.send(response)
  },
}

module.exports = {
  sign,process
};
