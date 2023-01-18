"use strict";

let FriendsStorage = require("./friendsStorage");

class Friends {
  constructor(body) {
    this.body = body;
  }

  async read(user) {
    const response = await FriendsStorage.read(user);
    return response;
  }

  async send(body) {
    const response = await FriendsStorage.send(body);
    return response;
  }
  async aceppt(body) {
    const response = await FriendsStorage.aceppt(body);
    return response;
  }
  async reject(body) {
    const response = await FriendsStorage.reject(body);
    return response;
  }
}

module.exports = Friends;
