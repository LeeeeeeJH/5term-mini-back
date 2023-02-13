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

  async updateProfile({ userId }, body, img) {
    try {
      const nicknameCheck = NickCheck.nicknameCheck(body.nickname);
      if (nicknameCheck.success) {
        return { success: false, error: "닉네임 중복" };
      }
      const userNo = await DataCheck.getUserNo(userId);
      if (!userNo) {
        throw new Error("사용자 id 변환 에러");
      }
      if (body.isImage === true && !img) {
        await ProfileStorage.updateProfile(userNo, body);
      } else {
        await ProfileStorage.updateProfile(userNo, body);
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
