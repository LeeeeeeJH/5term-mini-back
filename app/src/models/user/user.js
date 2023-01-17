"use strict";

let UserStorage = require("./userStorage");

class User {
  constructor(body) {
    this.body = body;
  }
  async login(body) {
    const response = await UserStorage.login(body);
    return response;
  }

  async check(body) {
    const type = Object.keys(body);

    const response =
      type[0] == "id"
        ? await UserStorage.idCheck(body)
        : await UserStorage.nicknameCheck(body);

    return response;
  }

  async register(body) {
    const response = await UserStorage.register(body);

    return response;
  }
}

module.exports = User;
