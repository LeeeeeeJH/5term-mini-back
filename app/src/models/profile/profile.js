"use strict";
const ProfileStorage = require("./profileStorage");
class Profile {
  constructor() {}

  async updateProfile({ userId }, body) {
    try {
      const response = await ProfileStorage.updateProfile(userId, body);
      return response;
    } catch (err) {
      throw new Error("프로필 수정 오류");
    }
  }

  async readProfile({ userId }) {
    try {
      const response = await ProfileStorage.readProfile(userId);
      return response;
    } catch (err) {
      throw new Error("프로필 db 조회 오류");
    }
  }

  async readFriendProfile({ userId }) {
    try {
      const response = await ProfileStorage.readFriendProfile(userId);
      return response;
    } catch (err) {
      throw new Error("친구 프로필 db 조회 오류");
    }
  }
}

module.exports = Profile;
