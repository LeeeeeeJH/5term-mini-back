"use strict";

let FriendsStorage = require("./friendsStorage");

class Friends {
  constructor(body) {
    this.body = body;
  }

  async getList(user) {
    try {
      let receiverList = await FriendsStorage.getReceiverList(user);
      let receiverListAddtag = [];

      for (let friend of receiverList) {
        receiverListAddtag.push(Object.values(friend) + "receiver");
      }

      let senderList = await FriendsStorage.getSenderList(user);
      let senderListAddtag = [];
      for (let friend of senderList) {
        senderListAddtag.push(Object.values(friend) + "sender");
      }

      let friendsList = [];
      for (let arr of receiverListAddtag) {
        friendsList.push(arr);
      }
      for (let arr of senderListAddtag) {
        friendsList.push(arr);
      }
      console.log(friendsList);
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
