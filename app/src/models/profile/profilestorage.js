"use strict";

const db = require("../../config/db");
require("dotenv").config();

class ProfileStorage {
  static async readProfile(userNo) {
    try {
      const sql = `SELECT u.id,u.password,u.name,u.phone,u.nickname,u.email,i.image_url AS image 
      FROM user AS u 
      LEFT JOIN user_image AS i 
      ON u.no = i.user_no 
      WHERE u.no = ?;`;
      const data = await db.query(sql, userNo);
      return data[0][0];
    } catch (error) {
      throw new Error("프로필 db 수정 오류");
    }
  }

  static async updateProfile(userNo) {
    try {
      const req = [
        userInfo.password,
        userInfo.name,
        userInfo.phone,
        userInfo.email,
        userInfo.nickname,
        userInfo.mention,
        userNo,
      ];
      const sql = `UPDATE user 
      SET password = ?, name = ?, phone = ?, email = ?, nickname = ?, mention = ? 
      WHERE no = ?;`;
      await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("프로필 db 수정 오류");
    }
  }

  static async updateUserImg(userNo, imgUrl, imgKey) {
    try {
      const req = [imgUrl, imgKey, userNo];
      const sql = `UPDATE user_image 
      SET image_url = ?, image_key = ? 
      WHERE user_no = ?;`;
      await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("프로필 db 수정 오류");
    }
  }
}

module.exports = ProfileStorage;
