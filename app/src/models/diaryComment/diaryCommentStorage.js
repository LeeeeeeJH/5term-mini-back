"use strict";

const db = require("../../config/db");

class DiaryCommentStorage {
  static async createDiaryComment(params, userNo, body) {
    try {
      const req = [params.diaryNo, userNo, body.content];
      const sql = "INSERT INTO diary_comment(diary_no,writer_no,content) VALUES(?,?,?);";
      await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("다이어리 댓글 db 작성 오류");
    }
  }

  static async deleteDiaryComment(params) {
    try {
      const req = [user_no, params.date];
      const sql = "DELETE FROM diary_comment WHERE no = ?;";
      await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("다이어리 댓글 db 수정 오류");
    }
  }

  static async updateDiaryComment(params, body) {
    try {
      const req = [body.content, params.id];
      const sql = "UPDATE diary_comment SET content = ? WHERE no = ?;";
      const data = await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      throw new Error("다이어리 댓글 db 작성 오류");
    }
  }

  static async readDiaryComment(params) {
    const sql =
      "SELECT d.no,u.nickname,d.content FROM diary_comment AS d INNER JOIN user AS u ON u.no = d.writer_no WHERE diary_no = ?;";
    const [data, buff] = await db.query(sql, params.diaryNo);
    const result = { success: false };
    if (data[0][0] != []) {
      result.success = true;
    }
    return data;
  }

  static async selectDiaryComment(params) {
    try {
      const sql = "SELECT no, writer_no, content FROM diary_comment WHERE diary_no = ?";
      const [data, buff] = await db.query(sql, params.diaryNo);
      return data;
    } catch (error) {
      console.error("db 조회 오류", error);
    }
  }
}

module.exports = DiaryCommentStorage;
