"use strict";

const db = require("../../config/db");
class DiaryLikeStorage {
  static async createDiaryLike(params, userNo) {
    try {
      const req = [Number(params.diaryNo), userNo];
      const sql = "INSERT INTO diary_likes(diary_no,liker_no) VALUES(?,?);";
      await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("다이어리 좋아요 db 생성 오류");
    }
  }
  static async deleteDiaryLike(params, userNo) {
    try {
      const req = [userNo, params.diaryNo];
      const sql = "DELETE FROM diary_likes WHERE liker_no = ? AND diary_no = ?;";
      await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("다이어리 좋아요 db 삭제 오류");
    }
  }

  static async readDiaryLike(params) {
    try {
      const req = [params.diaryNo];
      const sql = "SELECT COUNT(liker_no) AS likes FROM diary_likes WHERE diary_no = ?;";
      const data = await db.query(sql, req);
      return data[0][0];
    } catch (error) {
      throw new Error("다이어리 좋아요 db 조회 오류");
    }
  }
}

module.exports = DiaryLikeStorage;
