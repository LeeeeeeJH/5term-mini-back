"use strict";

let FriendsStorage = require("./friendsStorage");
const DataCheck = require("../user/dataCheck");

class Friends {
  constructor(body) {
    this.body = body;
  }

  async getList(user) {
    try {
      const receiverList = await FriendsStorage.getReceiverList(user);
      const senderList = await FriendsStorage.getSenderList(user);
      let friendsList = [];
      friendsList.push(...receiverList);
      friendsList.push(...senderList);
      friendsList.sort((a, b) => {
        if (a.nickname > b.nickname) return 1;
        if (a.nickname < b.nickname) return -1;
      });

      return friendsList;
    } catch (error) {
      console.log(error);
    }
  }

  async getWaitingList(user) {
    const userNo = await DataCheck.getUserNo(user);
    const waitingList = await FriendsStorage.getWaitingList(userNo);
    let friendsList = [];
    friendsList.push(...waitingList);
    return friendsList;
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

  async search(nickname) {
    try {
      const userNo = await DataCheck.getUserNoByNickname(nickname);
      const response = await FriendsStorage.search(userNo);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Friends;
