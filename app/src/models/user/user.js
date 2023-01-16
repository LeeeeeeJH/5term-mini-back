"use strict";

let UserStorage = require("./userStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  register(body) {
    const user = UserStorage.register(body);
    return { success: true };
  }

  login() {}

}


module.exports = User;