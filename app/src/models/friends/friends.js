"use strict";

let FriendsStorage = require("./friendsStorage");
const DataCheck = require("../dataCheck");

class Friends {
  constructor(body) {
    this.body = body;
  }

  async getList(user) {
    try {
      const receiverList = await FriendsStorage.getReceiverList(user);
      const senderList = await FriendsStorage.getSenderList(user);
      let friendsList = [];
      let response = [];
      for (let friends of senderList) {
        friendsList.push(friends.sender);
      }
      for (let friends of receiverList) {
        friendsList.push(friends.receiver);
      }
      for (let friendsNo of friendsList) {
        let friendsinfo = await FriendsStorage.getUserInfo(friendsNo);
        let info = [];
        info.push(...Object.values(friendsinfo[0][0]));
        response.push(info);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getWaitingList(user) {
    const waitingList = await FriendsStorage.getWaitingList(user);
    let friendsList = [];
    let response = [];
    for (let friends of waitingList) {
      friendsList.push(friends.sender);
    }
    for (let friendsNo of friendsList) {
      let friendsinfo = await FriendsStorage.getUserInfo(friendsNo);
      let info = [];
      info.push(...Object.values(friendsinfo[0][0]));
      response.push(info);
    }
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

  async search(nickname) {
    try {
      const userNo = await DataCheck.getUserNoByNickname(nickname);
      if (!userNo) {
        return { success: false };
      }
      const response = await FriendsStorage.search(userNo);

      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Friends;
