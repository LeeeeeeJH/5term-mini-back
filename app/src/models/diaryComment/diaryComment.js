"use strict";
const DataCheck = require("../dataCheck");
const DiaryCommentStorage = require("./diaryCommentStorage");

class DiaryComment {
  constructor() {}

  async createDiaryComment(params, body) {
    const userNo = await DataCheck.getUserNo(params.userId);
    if (!userNo) {
      throw new Error("사용자 id 변환 에러");
    }
    try {
      const response = await DiaryCommentStorage.createDiaryComment(params, userNo, body);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 댓글 생성 실패" };
    }
  }

  async deleteDiaryComment(params) {
    try {
      const response = await DiaryCommentStorage.deleteDiaryComment(params);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 댓글 삭제 실패" };
    }
  }

  async updateDiaryComment(params, body) {
    try {
      const response = await DiaryCommentStorage.updateDiaryComment(params, body);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 댓글 수정 실패" };
    }
  }

  async readDiaryComment(params) {
    try {
      const response = await DiaryCommentStorage.readDiaryComment(params);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 댓글 조회 실패" };
    }
  }
}

module.exports = DiaryComment;
