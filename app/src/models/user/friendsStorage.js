"use strict";

const db = require("../../config/db");
const DataCheck = require("../dataCheck");

class FriendsStorage {
  static async getReceiverList(user) {
    try {
      const userNo = await DataCheck.getUserNo(user);
      const sql =
        "SELECT receiver FROM friends_list WHERE sender = ? AND is_aceppted = 1";
      let list = await db.query(sql, userNo);
      return list[0];
    } catch (err) {
      console.log(err);
    }
  }
  static async getSenderList(user) {
    try {
      const userNo = await DataCheck.getUserNo(user);
      const sql =
        "SELECT sender FROM friends_list WHERE receiver = ? AND is_aceppted = 1";
      let list = await db.query(sql, userNo);

      return list[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async getUserInfo(no) {
    try {
      const sql =
        "SELECT user_image.image_url, user.nickname, user.no FROM user_image JOIN user ON user_image.user_no = user.no WHERE user_image.user_no = ?";
      const userInfo = db.query(sql, no);
      return userInfo;
    } catch (err) {
      console.log(err);
    }
  }

  static async getWaitingList(user) {
    try {
      const userNo = await DataCheck.getUserNo(user);
      const sql =
        "SELECT sender FROM friends_list WHERE receiver = ? AND is_aceppted = 0";
      let list = await db.query(sql, userNo);
      return list[0];
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
      const sql = "UPDATE friends_list SET is_accepted = 1 WHERE no = ?";
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
  static async search(userNo) {
    try {
      const sql =
        "SELECT user.name, user.nickname, user_image.image_url FROM user JOIN user_image ON user.no = user_image.user_no WHERE user.no = ?";
      const result = await db.query(sql, userNo);
      return result[0][0];
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = FriendsStorage;
