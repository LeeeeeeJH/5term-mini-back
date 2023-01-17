"use strict";

let FriendsStorage = require("./friendsStorage");

class Friends {
  constructor(body) {
    this.body = body;
  }

  send(body) {
    const response = FriendsStorage.send(body);
    return response;
  }
}

module.exports = Friends;
