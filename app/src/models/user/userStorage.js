"use strict";

const db = require("../../config/db");

class UserStorage {
  static async login(user) {
    try {
      const sql = "SELECT id,password FROM user WHERE id = ?";

      const check = await db.query(sql, user.id);
      return check;
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  static async idCheck(user) {
    try {
      const sql = "SELECT id FROM user WHERE id = ?";

      const check = await db.query(sql, [user.id]);
      return check[0][0] ? { success: true } : { success: false };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  static async nicknameCheck(user) {
    try {
      const sql = "SELECT nickName FROM user WHERE nickName = ?";

      const check = await db.query(sql, [user.nickName]);
      return check[0][0] ? { success: true } : { success: false };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  static async register(values) {
    try {
      const sql =
        "INSERT INTO user (id,password,name,phone,email,nickname) VALUES (?,?,?,?,?,?)";

      const insetResult = await db.query(sql, values);
      console.log(insetResult);
      return insetResult[0];
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  static async insertDefaultImage(userNo) {
    try {
      const url =
        "https://haruserver.s3.ap-northeast-2.amazonaws.com/user/default+profil.jpg";
      const key = "user/default profil.jpg";
      const sql =
        "INSERT INTO user_image (user_no, image_url, image_key) VALUES (?,?,?)";
      const insetResult = await db.query(sql, [userNo, url, key]);
      return insetResult[0];
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}

module.exports = UserStorage;
