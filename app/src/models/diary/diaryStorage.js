"use strict";

const db = require("../../config/db");
const DataCheck = require("../dataCheck");
class DiaryStorage {
  static async createDiary(params, body) {
    const user_no = await DataCheck.getUserNo(params.userId);
    const req = [user_no, body.date, body.title, body.content, body.image];
    const sql = "INSERT INTO diary(user_no,date,title,content,image) VALUES(?,?,?,?,?);";
    const [data, buff] = await db.query(sql, req);
    const result = { success: false };
    if (data.affectedRows) {
      result.success = true;
    }
    return result;
  }
  static async deleteDiary(params) {
    const sql = "DELETE FROM diary WHERE no = ?;";
    const [data, buff] = await db.query(sql, params.diaryNo);
    const result = { success: false };
    if (data.affectedRows) {
      result.success = true;
    }
  }

  static async updateDiary(params, body) {
    const req = [body.date, body.title, body.content, body.image, params.diaryNo];
    const sql = "UPDATE diary SET date = ?,title = ?, content = ?, image = ? WHERE no = ?;";
    const [data, buff] = await db.query(sql, req);
    const result = { success: false };
    if (data.affectedRows) {
      result.success = true;
    }
  }

  static async readDiary(params) {
    const user_no = await DataCheck.getUserNo(params.userId);
    const sql =
      "SELECT no, date, title, content, image FROM diary WHERE DATE_FORMAT(diary.date,'%y-%m-%d') = ? AND user_no = ?;";
    const req = [params.date, user_no];
    const [data, buff] = await db.query(sql, req);
    const result = { success: false };
    if (data[0][0] != []) {
      result.success = true;
    }
    return data;
  }

  static async readSelectDiary(params, user_no) {
    try {
      const req = [params.date, user_no];
      const sql =
        "SELECT DATE_FORMAT(diary.date,'%d') AS days FROM diary WHERE DATE_FORMAT(diary.date,'%y-%m') = ? AND user_no = ? ORDER BY days";
      const diaries = await db.query(sql, req);
      return diaries[0];
    } catch (error) {
      console.log("다이어리 db 조회 오류");
    }
  }

  static async createDiaryComment(params, body) {
    try {
      const user_no = await DataCheck.getUserNo(params.userId);
      const req = [params.diaryNo, user_no, body.content];
      const sql = "INSERT INTO diary_comment(diary_no,writer_no,content) VALUES(?,?,?);";
      const [data, buff] = await db.query(sql, req);
      const result = { success: true };
      return result;
    } catch (error) {
      console.log("다이어리 댓글 db 작성 오류");
    }
  }

  static async deleteDiaryComment(params) {
    const req = [user_no, params.date];
    const sql = "DELETE FROM diary_comment WHERE no = ?;";
    const [data, buff] = await db.query(sql, req);
    const result = { success: false };
    if (data.affectedRows) {
      result.success = true;
    }
  }

  static async readDiaryComment(params) {
    const sql =
      "SELECT u.nickname,d.content FROM diary_comment AS d INNER JOIN user AS u ON u.no = d.writer_no WHERE diary_no = ?;";
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

  static async createDiaryLike(params) {
    const user_no = await DataCheck.getUserNo(params.userId);
    const req = [Number(params.diaryNo), user_no];
    const sql = "INSERT INTO diary_likes(diary_no,liker_no) VALUES(?,?);";
  }
  static deleteDiaryLike(params) {
    return new Promise(async (resolve, reject) => {
      const user_no = await DataCheck.getUserNo(params.userId);
      const values = [user_no, params.diaryNo];
      const query = "DELETE FROM diary_likes WHERE liker_no = ? AND diary_no = ?;";
      db.query(query, values, (err) => {
        if (err) reject(err);
        resolve({ success: true });
      });
    });
  }

  static readDiaryLike(params) {
    return new Promise((resolve, reject) => {
      const query = "SELECT COUNT(liker_no) FROM diary_likes WHERE diary_no = ?;";
      db.query(query, params.diaryNo, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = DiaryStorage;
