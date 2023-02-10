"use strict";
const db = require("../../config/db");

class DataCheck {
  static async getUserNo(id) {
    try {
      const sql = "SELECT no FROM user WHERE id = ?;";
      const result = await db.query(sql, id);
      if (!result[0][0]) {
        return false;
      }
      return result[0][0].no;
    } catch (error) {
      console.log("getUserNo 에러 : ", error);
      throw new Error("getUserNo오류");
    }
  }

  static async getUserNoByNickname(nickname) {
    try {
      const sql = "SELECT no FROM user WHERE nickname = ?;";
      const result = await db.query(sql, nickname);
      if (!result[0][0]) {
        return false;
      }
      return result[0][0]?.no;
    } catch (error) {
      console.log(error);
      throw new Error("getUserNoByNickname오류");
    }
  }

  static async checkEmail(email) {
    try {
      const sql = "SELECT id, password, nickname FROM user WHERE email = ?;";
      const result = await db.query(sql, email);
      if (!result[0][0]) {
        return false;
      }
      return result[0][0];
    } catch (error) {
      console.log("checkEmail 에러 : ", error);
    }
  }

  static async isAceppted(myNo, yourNo) {
    try {
      const sql =
        "SELECT no AS listNo FROM friends_list WHERE ((sender = ? AND receiver = ?) OR (receiver = ? AND sender = ?)) AND is_aceppted = 1";
      const result = await db.query(sql, [myNo, yourNo, myNo, yourNo]);
      if (!result[0][0]) {
        return 0;
      }
      return result[0][0].listNo;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DataCheck;
