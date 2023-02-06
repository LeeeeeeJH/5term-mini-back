"use strict";

const db = require("../../config/db");
const DataCheck = require("../dataCheck");

class FriendsStorage {
  static async getReceiverList(user) {
    try {
      const userNo = await DataCheck.getUserNo(user);
      const sql =
        "SELECT receiver, is_aceppted FROM friends_list WHERE sender = ?";
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
        "SELECT sender, is_aceppted FROM friends_list WHERE receiver = ?";
      let list = await db.query(sql, userNo);

      return list[0];
    } catch (err) {
      console.log(err);
    }
  }

  static async getFriendProfile(friendsList) {
    try {
      const sql =
        "SELECT user.name, user.nickname, user_image.image_url FROM user JOIN user_image ON user.no = user_image.user_no WHERE user.no = ?";
      for (let user of friendsList) {
        let profile = await db.query(sql, user[0]);
        user.push(...Object.values(profile[0][0]));
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
