"use strict";

const db = require("../../config/db");

class ProfileStorage {
  static async updateProfile(userId, body) {
    try {
      const req = [body.password, body.name, body.phone, body.nickname, body.email, body.image, userId];
      const sql = "UPDATE user SET password = ?,name = ?, phone = ?, nickname = ?, email = ?,image = ? WHERE id = ?;";
      await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("프로필 db 수정 오류");
    }
  }

  static async readProfile(userId) {
    try {
      const sql =
        "SELECT u.id,u.password,u.name,u.phone,u.nickname,u.email,i.image_url FROM user AS u INNER JOIN user_image AS i ON u.image = i.no WHERE id =?;";
      const data = await db.query(sql, userId);
      return data[0][0];
    } catch (error) {
      console.log(error);
    }
  }

  static async readFriendProfile(userId) {
    try {
      const sql = "SELECT id,name,phone,nickname,email,image FROM user WHERE id = ?;";
      const data = await db.query(sql, userId);
      return data[0][0];
    } catch (error) {
      throw new Error("친구 프로필 db 조회 오류");
    }
  }
}

module.exports = ProfileStorage;
