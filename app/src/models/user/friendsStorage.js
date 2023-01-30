"use strict";

const db = require("../../config/db");
const Friends = require("./friends");
const DataCheck = require("../dataCheck");

class FriendsStorage {
  // url nickname is_aceppted tag
  static async getReceiverList(user) {
    try {
      const userNo = await DataCheck.getUserNo(user);
      const sql =
        "SELECT receiver, is_accepted FROM friends_list WHERE sender = ?";
      let list = await db.query(sql, userNo);
      let receiverList = [];
      for (let obj of list[0]) {
        obj.tag = "receiver";
        receiverList.push(Object.values(obj));
      }

      return receiverList;
    } catch (err) {
      console.log(err);
    }
  }
  static async getSenderList(user) {
    try {
      const userNo = await DataCheck.getUserNo(user);
      const sql =
        "SELECT sender, is_accepted FROM friends_list WHERE receiver = ?";
      let list = await db.query(sql, userNo);
      let senderList = [];
      for (let obj of list[0]) {
        obj.tag = "sender";
        senderList.push(Object.values(obj));
      }
      return senderList;
    } catch (err) {
      console.log(err);
    }
  }

  static async getFriendProfile(friendsList) {
    try {
      const sql = "SELECT nickName, image FROM user WHERE no = ?";
      for (let user of friendsList) {
        let profile = await db.query(sql, user[0]);
        let profileArray = Object.values(profile[0][0]);
        user.unshift(profileArray[0]);
        user.unshift(profileArray[1]);
      }

      return friendsList;
    } catch (err) {
      console.log(err);
    }
  }

  static async send(user) {
    try {
      const sql = "INSERT INTO friends_list (sender,receiver) VALUES (?,?)";
      const values = [user.sender, user.receiver];
      db.query(sql, values);
      return { success: true };
    } catch (err) {
      console.log(err);
    }
  }
  static aceppt(user) {
    try {
      const sql = "UPDATE friends_list SET is_aceppted = 1 WHERE no = ?";
      db.query(sql, [user.no]);
      return { success: true };
    } catch (err) {
      console.log(err);
    }
  }

  static reject(user) {
    try {
      const sql = "DELETE FROM friends_list WHERE no = ?";
      db.query(sql, [user.no]);
      return { success: true };
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = FriendsStorage;
