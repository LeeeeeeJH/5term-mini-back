"use strict";

let UserStorage = require("./userStorage");

class User {
  constructor(body) {
    this.body = body;
  }
  async login(user) {
    const check = await UserStorage.login(user);

    if (check[0][0].password === user.password) {
      return { success: true };
    }
    return { success: false };
  }

  async check(user) {
    const type = Object.keys(user);

    const response =
      type[0] == "id"
        ? await UserStorage.idCheck(user)
        : await UserStorage.nicknameCheck(user);
    return response;
  }

  async register(user) {
    //중복확인 아이디 닉네임
    const idCheck = await UserStorage.idCheck(user);
    if (idCheck.success) {
      return { success: false, error: "id 중복" };
    }

    const nicknameCheck = await UserStorage.nicknameCheck(user);
    if (nicknameCheck.success) {
      return { success: false, error: "닉네임 중복" };
    }
    if (!idCheck.success && !nicknameCheck.success) {
      const phoneNum = "010-" + user.senterPhoneNum + "-" + user.lastPhoneNum;
      const email = user.firstEmaile + user.lastEmaile;
      const values = [
        user.id,
        user.password,
        user.name,
        phoneNum,
        email,
        user.nickName,
      ];
      const insetResult = await UserStorage.register(values);
      if (!insetResult.affectedRows) {
        return { success: false };
      }

      await UserStorage.insertDefaultImage(insetResult.insertId);
      return { success: true };
    }
  }
}

module.exports = User;
