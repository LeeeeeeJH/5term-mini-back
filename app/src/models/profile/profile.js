"use strict";
const ProfileStorage = require("./profileStorage");
const DataCheck = require("../user/dataCheck");
class Profile {
  constructor() {}

  async readProfile({ userId }) {
    try {
      const userNo = await DataCheck.getUserNo(userId);
      if (!userNo) {
        throw new Error("사용자 id 변환 에러");
      }
      const response = await ProfileStorage.readProfile(userNo);
      return response;
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  async updateProfile({ userId }, userInfo, img) {
    try {
      const phone = "010-" + userInfo.midNum + "-" + userInfo.lastNum;
      const userNo = await DataCheck.getUserNo(userId);
      if (!userNo) {
        throw new Error("사용자 id 변환 에러");
      }
      await ProfileStorage.updateProfile(userNo, userInfo, phone);
      await ProfileStorage.updateUserImg(userNo, img?.location, img?.key);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}

module.exports = Profile;
