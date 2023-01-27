"use strict";

let FriendsStorage = require("./friendsStorage");

class Friends {
  constructor(body) {
    this.body = body;
  }

  async getList(user) {
    try {
      let receiverList = await FriendsStorage.getReceiverList(user);
      let senderList = await FriendsStorage.getSenderList(user);
      let friendsList = [];
      for (let arr of receiverList) {
        friendsList.push(arr);
      }
      for (let arr of senderList) {
        friendsList.push(arr);
      }
      let friendsProfileList = await FriendsStorage.getFriendProfile(
        friendsList
      );

      return friendsProfileList;
    } catch (error) {
      console.log(error);
    }
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
