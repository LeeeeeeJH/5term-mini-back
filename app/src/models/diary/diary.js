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
      const diaryNo = await DiaryStorage.createDiary(userNo, body);
      if (image) {
        await DiaryStorage.uploadDiaryImg(diaryNo, image.location, image.key);
      }
      return { success: true };
    } catch (error) {
      console.error(error);
    }
  }

  async deleteDiary(params) {
    try {
      const response = await DiaryStorage.deleteDiary(params);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async updateDiary(params, body, image) {
    try {
      const response = await DiaryStorage.updateDiary(params, body, image);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async readDiary(params) {
    try {
      const userNo = await DataCheck.getUserNo(params.userId);
      if (!userNo) {
        throw new Error("사용자 id 변환 에러");
      }
      const diary = await DiaryStorage.readDiary(userNo, params);
      return diary;
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  }
}

module.exports = Diary;
