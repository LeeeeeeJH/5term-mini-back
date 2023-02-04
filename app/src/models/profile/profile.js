"use strict";
const ProfileStorage = require("./profileStorage");
const DataCheck = require("../dataCheck");
class Profile {
  constructor() {}

  async readProfile({ userId }) {
    try {
      const response = await ProfileStorage.readProfile(userId);
      return response;
    } catch (err) {
      throw new Error("프로필 db 조회 오류");
    }
  }

  async updateProfile({ userId }, userInfo, img) {
    try {
      const userNo = await DataCheck.getUserNo(userId);
      if (!userNo) {
        throw new Error("사용자 id 변환 에러");
      }
      const profileInfo = await ProfileStorage.readProfile(userNo);
      if (!profileInfo.image && img) {
        await ProfileStorage.uploadProfileImg(userNo, userInfo, img.location, img.key);
      }
      await ProfileStorage.updateProfile(userNo, img);
      return { success: true };
    } catch (err) {
      throw new Error("프로필 수정 오류");
    }
  }
}

module.exports = Profile;
