"use strict";

let FriendsStorage = require("./friendsStorage");
const DataCheck = require("../user/dataCheck");
const { readSelectDiary } = require("../diary/diaryStorage");

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
    try {
      const senderNo = await DataCheck.getUserNo(body.senderId);
      const receiverNo = await DataCheck.getUserNoByNickname(
        body.receiverNickname
      );
      const isAceppted = await DataCheck.isAceppted(senderNo, receiverNo);

      if (isAceppted == 0) {
        return { success: false };
      }

      if (!senderNo || !receiverNo) {
        return { success: false };
      }
      const response = await FriendsStorage.send(senderNo, receiverNo);
      return response;
    } catch (error) {
      console.log("js" + error);
      return { success: false };
    }
  }

  async aceppt(body) {
    const response = await FriendsStorage.aceppt(body);
    if (!response) {
      return { success: false };
    }
    return { success: true };
  }

  async reject(body) {
    const response = await FriendsStorage.reject(body);
    if (!response) {
      return { success: false };
    }
    return { success: true };
  }

  async search(myNickname, yourNickname) {
    try {
      const myNo = await DataCheck.getUserNoByNickname(myNickname);
      const yourNo = await DataCheck.getUserNoByNickname(yourNickname);
      const response = await FriendsStorage.search(yourNo);
      const isAceppted = await DataCheck.isAceppted(myNo, yourNo);
      response.listNo = isAceppted;

      if (response.nickname) {
        response.success = true;
      } else {
        response.success = false;
      }
      return response;
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
}

module.exports = Friends;
