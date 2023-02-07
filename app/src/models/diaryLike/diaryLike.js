"use strict";
const DataCheck = require("../user/dataCheck");
const DiaryLikeStorage = require("./diaryLikeStorage");

class DiaryLike {
  constructor() {}
  async createDiaryLike(params) {
    const userNo = await DataCheck.getUserNo(params.userId);
    if (!userNo) {
      throw new Error("사용자 id 변환 오류");
    }
    try {
      const response = await DiaryLikeStorage.createDiaryLike(params, userNo);
      return response;
    } catch (error) {
      throw new Error("다이어리 좋아요 생성 오류");
    }
  }

  async deleteDiaryLike(params) {
    const userNo = await DataCheck.getUserNo(params.userId);
    if (!userNo) {
      throw new Error("사용자 id 변환 오류");
    }
    try {
      const response = await DiaryLikeStorage.deleteDiaryLike(params, userNo);
      return response;
    } catch (error) {
      throw new Error("다이어리 좋아요 삭제 오류");
    }
  }

  async readDiaryLike(params) {
    try {
      const response = await DiaryLikeStorage.readDiaryLike(params);
      return response;
    } catch (error) {
      throw new Error("다이어리 좋아요 조회 오류");
    }
  }
}

module.exports = DiaryLike;
