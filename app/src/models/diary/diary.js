"use strict";
const DataCheck = require("../dataCheck");
const DiaryStorage = require("./diaryStorage");
class Diary {
  constructor() {}
  async createDiary(params, body, image) {
    try {
      const userNo = await DataCheck.getUserNo(params.userId);
      if (!userNo) {
        throw new Error("사용자 id 변환 에러");
      }
      const response = DiaryStorage.createDiary(userNo, body, image.location, image.key);
      return response;
    } catch (error) {
      log.error;
    }
  }

  async deleteDiary(params) {
    try {
      const response = await DiaryStorage.deleteDiary(params);
      return response;
    } catch (error) {
      throw new Error("다이어리 삭제 오류");
    }
  }

  async updateDiary(params, body, image) {
    try {
      const response = await DiaryStorage.updateDiary(params, body, image);
      return response;
    } catch (error) {
      throw new Error("다이어리 수정 오류");
    }
  }

  async readDiary(params) {
    const userNo = await DataCheck.getUserNo(params.userId);
    if (!userNo) {
      throw new Error("사용자 id 변환 에러");
    }
    try {
      const response = await DiaryStorage.readDiary(userNo, params);
      if (!response) {
        return "데이터 없음";
      }
      return response;
    } catch (error) {
      throw new Error("다이어리 조회 오류");
    }
  }

  async readSelectDiary(params) {
    try {
      const userNo = await DataCheck.getUserNo(params.userId);
      if (!userNo) {
        throw new Error("사용자 id 변환 에러");
      }
      const diaries = await DiaryStorage.readSelectDiary(params, userNo);
      const diaryDay = [];
      for (let i of diaries) {
        diaryDay.push(i.days);
      }
      return diaryDay.map(Number);
    } catch (error) {
      throw new Error("월별 다이어리 존재 일 조회 에러");
    }
  }
}

module.exports = Diary;
