"use strict";

let UserStorage = require("./userStorage");

class User {
  constructor(body) {
    this.body = body;
  }
  async login(user) {
    const response = await UserStorage.login(user);
    return response;
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
      //에러처리
    }

    return insetResult;
  }
}

module.exports = User;
