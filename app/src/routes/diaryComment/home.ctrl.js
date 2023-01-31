"use strict";

const DiaryComment = require("../../models/diaryComment/diaryComment");

const diaryComment = {
  createDiaryComment: async (req, res) => {
    const diaryComment = new DiaryComment();
    const response = await diaryComment.createDiaryComment(req.params, req.body);
    return res.json(response);
  },
  deleteDiaryComment: async (req, res) => {
    const diaryComment = new DiaryComment();
    const response = await diaryComment.deleteDiaryComment(req.params);
    return res.json(response);
  },
  updateDiaryComment: async (req, res) => {
    const diaryComment = new DiaryComment();
    const response = await diaryComment.updateDiaryComment(req.params, req.body);
    return res.json(response);
  },
  getDiaryComment: async (req, res) => {
    const diaryComment = new DiaryComment();
    const response = await diaryComment.readDiaryComment(req.params);
    res.send(response);
  },
};

module.exports = { diaryComment };
