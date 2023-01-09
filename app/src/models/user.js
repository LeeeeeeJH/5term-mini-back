"use strict";

let UserStorage = require("./userStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  register(body) {
    const user = UserStorage.register(body);
  }

  login() {}

  async getInfo(body) {
    const response = await UserStorage.getInfo(body);

    return response
  }
}


module.exports = User;
