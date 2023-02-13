"use strict";

const db = require("../../config/db");
const DataCheck = require("../user/dataCheck");

class FriendsStorage {
  static async getReceiverList(user) {
    try {
      const userNo = await DataCheck.getUserNo(user);
      const sql = `SELECT friends_list.receiver AS friend, user.nickname, user_image.image_url, friends_list.no AS friendListNo 
      FROM friends_list
      INNER JOIN user ON user.no = friends_list.receiver 
      INNER JOIN user_image ON user_image.user_no = friends_list.receiver
      WHERE friends_list.sender = ? AND friends_list.is_aceppted = 1`;
      let list = await db.query(sql, userNo);
      return list[0];
    } catch (errpr) {
      console.log(error);
      return { success: false };
    }
  }
  static async getSenderList(user) {
    try {
      const userNo = await DataCheck.getUserNo(user);
      const sql = `SELECT friends_list.sender AS friend, user.nickname, user_image.image_url, friends_list.no AS friendListNo
      FROM friends_list
      INNER JOIN user ON user.no = friends_list.sender 
      INNER JOIN user_image ON user_image.user_no = friends_list.sender
      WHERE friends_list.receiver = ? AND friends_list.is_aceppted = 1`;
      let list = await db.query(sql, userNo);
      return list[0];
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  static async getWaitingList(userNo) {
    try {
      const sql = `SELECT friends_list.sender, user.nickname, friends_list.no AS list_no
      FROM friends_list
      INNER JOIN user ON user.no = friends_list.sender
      WHERE friends_list.receiver = ? AND friends_list.is_aceppted = 0`;
      let list = await db.query(sql, userNo);
      console.log(list);
      return list[0];
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  static async send(user) {
    try {
      const sql = "INSERT INTO friends_list (sender,receiver) VALUES (?,?)";
      const values = [user.sender, user.receiver];
      db.query(sql, values);
      return { success: true };
    } catch (err) {
      console.log(error);
      return { success: false };
    }
  }
  static aceppt(user) {
    try {
      const sql = "UPDATE friends_list SET is_aceppted = 1 WHERE no = ?";
      db.query(sql, [user.no]);
      return { success: true };
    } catch (err) {
      console.log(error);
      return { success: false };
    }
  }

  static reject(user) {
    try {
      const sql = "DELETE FROM friends_list WHERE no = ?";
      db.query(sql, [user.no]);
      return { success: true };
    } catch (err) {
      console.log(error);
      return { success: false };
    }
  }
  static async search(userNo) {
    try {
      const sql = `SELECT user.name, user.nickname, user_image.image_url 
        FROM user INNER JOIN user_image 
        ON user.no = user_image.user_no 
        WHERE user.no = ?`;
      const result = await db.query(sql, userNo);
      return result[0][0];
    } catch (err) {
      console.log(error);
      return { success: false };
    }
  }
}

module.exports = FriendsStorage;
