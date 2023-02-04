"use strict";

const db = require("../../config/db");

class ProfileStorage {
  static async readProfile(userId) {
    try {
      const sql =
        "SELECT u.id,u.password,u.name,u.phone,u.nickname,u.email,i.image_url AS image FROM user AS u INNER JOIN user_image AS i ON u.image = i.no WHERE id =?;";
      const data = await db.query(sql, userId);
      return data[0][0];
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProfile(userNo, body, imgUrl, imgKey) {
    try {
      const req = [body.password, body.name, body.phone, body.nickname, body.email, imgUrl, imgKey, userNo, userNo];
      const sql = `UPDATE user AS u, user_image AS ui 
      SET u.password = ?, u.name = ?, u.phone = ?, u.nickname = ?, u.email = ?, ui.image_url = ?, ui.image_key = ? 
      WHERE no = ? AND user_no = ?;`;
      await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("프로필 db 수정 오류");
    }
  }

  static async uploadUserImg(userNo, imgUrl, imgKey) {
    try {
      const req = [userNo, imgUrl, imgKey];
      const sql = `INSERT INTO user_image(user_no,image_url,image_key) 
      VALUES (?,?,?);`;
      await db.query(sql, req);
      return { succss: true };
    } catch (error) {
      throw new Error("diary image db 삽입 오류");
    }
  }
}

module.exports = ProfileStorage;
