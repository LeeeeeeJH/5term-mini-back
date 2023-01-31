"use strict";

const db = require("../../config/db");
class DiaryStorage {
  static async createDiary(userNo, body, image) {
    try {
      const req = [userNo, body.date, body.title, body.content, image];
      const sql = "INSERT INTO diary(user_no,date,title,content,image) VALUES(?,?,?,?,?);";
      await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("다이어리 db 생성 오류");
    }
  }
  static async deleteDiary(params) {
    try {
      const sql = "DELETE FROM diary WHERE no = ?;";
      await db.query(sql, params.diaryNo);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("다이어리 db 삭제 오류");
    }
  }

  static async updateDiary(params, body, image) {
    try {
      const req = [body.title, body.content, image, params.diaryNo];
      const sql = "UPDATE diary SET title = ?, content = ?, image = ? WHERE no = ?;";
      await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("다이어리 db 수정 오류");
    }
  }

  static async readDiary(userNo, params) {
    try {
      const sql =
        "SELECT no, date, title, content, image FROM diary WHERE DATE_FORMAT(diary.date,'%Y-%m-%d') = ? AND user_no = ?;";
      const req = [params.date, userNo];
      const diary = await db.query(sql, req);
      return diary[0][0];
    } catch (error) {
      throw new Error("다이어리 db 조회 오류");
    }
  }

  static async readSelectDiary(params, userNo) {
    try {
      const req = [params.date, userNo];
      const sql =
        "SELECT DATE_FORMAT(diary.date,'%d') AS days FROM diary WHERE DATE_FORMAT(diary.date,'%Y-%m') = ? AND user_no = ? ORDER BY days";
      const diaries = await db.query(sql, req);
      return diaries[0];
    } catch (error) {
      throw new Error("다이어리 월별 db 조회 오류");
    }
  }
}

module.exports = DiaryStorage;
