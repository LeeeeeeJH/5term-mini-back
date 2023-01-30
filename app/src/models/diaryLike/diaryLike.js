"use strict";
const DataCheck = require("../dataCheck");
const DiaryLikeStorage = require("./diaryLikeStorage");

class DiaryLike {
  constructor() {}
  async createDiaryLike(params) {
    const userNo = await DataCheck.getUserNo(params.userId);
    if (!userNo) {
      throw new Error("사용자 id 변환 에러");
    }
    try {
      const response = await DiaryLikeStorage.createDiaryLike(params, userNo);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 좋아요 추가 실패" };
    }
  }

  async deleteDiaryLike(params) {
    const userNo = await DataCheck.getUserNo(params.userId);
    if (!userNo) {
      throw new Error("사용자 id 변환 에러");
    }
    try {
      const response = await DiaryLikeStorage.deleteDiaryLike(params, userNo);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 좋아요 삭제 실패" };
    }
  }

  async readDiaryLike(params) {
    try {
      const response = await DiaryLikeStorage.readDiaryLike(params);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 좋아요 조회 실패" };
    }
  }
}

module.exports = DiaryLike;
