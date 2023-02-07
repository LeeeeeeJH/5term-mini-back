"use strict";
const DataCheck = require("../dataCheck");
const DiaryCommentStorage = require("./diaryCommentStorage");

class DiaryComment {
  constructor() {}

  async createDiaryComment(params, body) {
    const userNo = await DataCheck.getUserNo(params.userId);
    if (!userNo) {
      throw new Error("사용자 id 변환 오류");
    }
    try {
      const response = await DiaryCommentStorage.createDiaryComment(params, userNo, body);
      return response;
    } catch (error) {
      throw new Error("다이어리 댓글 생성 오류");
    }
  }

  async deleteDiaryComment(params) {
    try {
      const response = await DiaryCommentStorage.deleteDiaryComment(params);
      return response;
    } catch (error) {
      throw new Error("다이어리 댓글 삭제 오류");
    }
  }

  async updateDiaryComment(params, body) {
    try {
      const response = await DiaryCommentStorage.updateDiaryComment(params, body);
      return response;
    } catch (error) {
      throw new Error("다이어리 댓글 수정 오류");
    }
  }

  async readDiaryComment(params) {
    try {
      const response = await DiaryCommentStorage.readDiaryComment(params);
      return response;
    } catch (error) {
      throw new Error("다이어리 댓글 조회 오류");
    }
  }
}

module.exports = DiaryComment;
