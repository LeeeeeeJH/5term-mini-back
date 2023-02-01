const DiaryLike = require("../../models/diaryLike/diaryLike");

const diaryLike = {
  createDiaryLike: async (req, res) => {
    const diaryLike = new DiaryLike();
    const response = await diaryLike.createDiaryLike(req.params);
    return res.json(response);
  },
  deleteDiaryLike: async (req, res) => {
    const diaryLike = new DiaryLike();
    const response = await diaryLike.deleteDiaryLike(req.params);
    return res.json(response);
  },
  getDiaryLike: async (req, res) => {
    const diaryLike = new DiaryLike();
    const response = await diaryLike.readDiaryLike(req.params);
    return res.json(response);
  },
};

module.exports = { diaryLike };
