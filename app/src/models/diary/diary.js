"use strict";
const DataCheck = require("../dataCheck");
const DiaryStorage = require("./diaryStorage");
class Diary {
  constructor() {}
  createDiary(params, body) {
    try {
      const response = DiaryStorage.createDiary(params, body);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 생성 실패" };
    }
  }

  async deleteDiary(params) {
    try {
      const response = await DiaryStorage.deleteDiary(params);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 삭제 실패" };
    }
  }

  async updateDiary(params, body) {
    try {
      const response = await DiaryStorage.updateDiary(params, body);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 수정 실패" };
    }
  }

  async readDiary(params) {
    try {
      const response = await DiaryStorage.readDiary(params);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 조회 실패" };
    }
  }

  async readSelectDiary(params) {
    try {
      const user_no = await DataCheck.getUserNo(params.userId);
      if (!user_no) {
        throw new Error("사용자 id 변환 에러");
      }
      const diaries = await DiaryStorage.readSelectDiary(params, user_no);
      const diaryDay = [];
      for (let i of diaries) {
        diaryDay.push(i.days);
      }
      return diaryDay.map(Number);
    } catch (error) {
      throw new Error("월별 다이어리 존재 일 조회 에러");
    }
  }

  async createDiaryComment(params, body) {
    try {
      const response = await DiaryStorage.createDiaryComment(params, body);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 댓글 생성 실패" };
    }
  }

  async deleteDiaryComment(params) {
    try {
      const response = await DiaryStorage.deleteDiaryComment(params);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 댓글 삭제 실패" };
    }
  }

  async updateDiaryComment(params, body) {
    try {
      const response = await DiaryStorage.updateDiaryComment(params, body);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 댓글 수정 실패" };
    }
  }

  async readDiaryComment(params) {
    try {
      const response = await DiaryStorage.readDiaryComment(params);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 댓글 조회 실패" };
    }
  }

  async createDiaryLike(params) {
    try {
      const response = await DiaryStorage.createDiaryLike(params);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 좋아요 추가 실패" };
    }
  }

  async deleteDiaryLike(params) {
    try {
      const response = await DiaryStorage.deleteDiaryLike(params);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 좋아요 삭제 실패" };
    }
  }

  async readDiaryLike(params) {
    try {
      const response = await DiaryStorage.readDiaryLike(params);
      return response;
    } catch (error) {
      return { success: false, msg: "다이어리 좋아요 조회 실패" };
    }
  }
}

module.exports = Diary;
