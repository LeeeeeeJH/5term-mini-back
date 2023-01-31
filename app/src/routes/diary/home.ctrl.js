"use strict";

const Diary = require("../../models/diary/diary");

const diary = {
  createDiary: async (req, res) => {
    const diary = new Diary();
    const response = await diary.createDiary(req.params, req.body, req.file.location);
    return res.json(response);
  },

  deleteDiary: async (req, res) => {
    const diary = new Diary();
    const response = await diary.deleteDiary(req.params);
    return res.json(response);
  },
  updateDiary: async (req, res) => {
    const diary = new Diary();
    const response = await diary.updateDiary(req.params, req.body, req.file.location);
    return res.json(response);
  },
  getDiary: async (req, res) => {
    const diary = new Diary();
    const response = await diary.readDiary(req.params);
    res.send(response);
  },
  getSelectDiary: async (req, res) => {
    const diary = new Diary();
    const response = await diary.readSelectDiary(req.params);
    res.send(response);
  },
};

module.exports = { diary };
