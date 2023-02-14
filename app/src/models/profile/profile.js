"use strict";
const ProfileStorage = require("./profileStorage");
const DataCheck = require("../user/dataCheck");
const NickCheck = require("../user/userStorage");
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
      const nicknameCheck = NickCheck.nicknameCheck(userInfo.nickname);
      if (nicknameCheck.success) {
        throw { success: false, error: "닉네임 중복" };
      }
      const userNo = await DataCheck.getUserNo(userId);
      if (!userNo) {
        throw new Error("사용자 id 변환 에러");
      }
      if (userInfo.isImage === true && !img) {
        await ProfileStorage.updateProfile(userNo, userInfo);
      } else {
        await ProfileStorage.updateProfile(userNo, userInfo);
        await ProfileStorage.updateUserImg(userNo, img?.location, img?.key);
      }
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}

module.exports = Profile;
