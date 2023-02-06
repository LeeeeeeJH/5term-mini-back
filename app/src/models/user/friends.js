"use strict";

let FriendsStorage = require("./friendsStorage");
const DataCheck = require("../dataCheck");

class Friends {
  constructor(body) {
    this.body = body;
  }

  async getList(user) {
    try {
      let receiverList = await FriendsStorage.getReceiverList(user);
      let receiverListAddtag = [];

      for (let friend of receiverList) {
        receiverListAddtag.push(Object.values(friend));
        receiverListAddtag[receiverList.indexOf(friend)].push("receiver");
      }

      let senderList = await FriendsStorage.getSenderList(user);
      let senderListAddtag = [];
      for (let friend of senderList) {
        senderListAddtag.push(Object.values(friend));
        senderListAddtag[senderList.indexOf(friend)].push("sender");
      }

      let friendsList = [];
      for (let arr of receiverListAddtag) {
        friendsList.push(arr);
      }
      for (let arr of senderListAddtag) {
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

  async search(body) {
    try {
      const userNo = await DataCheck.getUserNoByNickname(body.nickname);
      const response = await FriendsStorage.search(userNo);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Friends;
