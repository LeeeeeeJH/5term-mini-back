"use strict";
const db = require("../../config/db");

class TodoCommentStorage {
  static async getComment(client) {
    try {
      const req = [client.date, client.id];
      const sql = `SELECT todo_comment.no, todo_comment.content, writer.id AS writer 
        FROM todo_comment 
        INNER JOIN user ON todo_comment.user_no = user.no 
        INNER JOIN user AS writer ON todo_comment.writer_no = writer.no
        WHERE todo_comment.date = ? AND user.id = ? 
        GROUP BY todo_comment.no;`;

      const result = await db.query(sql, req);
      return result[0];
    } catch (e) {
      console.log("getComment 에러 : ", e);
      return { success: false };
    }
  }

  static async addComment(client, user_no, writer_no) {
    try {
      const sql =
        "INSERT INTO todo_comment (user_no, writer_no, date, content) VALUES (?,?,?,?);";
      const req = [user_no, writer_no, client.date, client.content];

      const addResult = (await db.query(sql, req))[0].affectedRows;

      if (addResult) {
        return { success: true };
      }

      return { success: false };
    } catch (e) {
      console.log("addComment 에러 : ", e);
      return { success: false };
    }
  }

  static async editComment(client) {
    try {
      const sql = "UPDATE todo_comment SET content= ? WHERE no= ?;";
      const req = [client.content, client.cmtNo];
      const editResult = (await db.query(sql, req))[0].affectedRows;

      if (editResult) {
        return { success: true };
      }

      return { success: false };
    } catch (e) {
      console.log("editComment 에러 : ", e);
      return { success: false };
    }
  }

  static async deleteComment(client) {
    try {
      let sql, req;

      if (client === 0) {
        return (result.success = true);
      }

      if (client.cmtNo) {
        sql = "DELETE FROM todo_comment WHERE no= ?";
        req = client.cmtNo;
      } else {
        sql = "DELETE FROM todo_comment WHERE date= ?";
        req = client;
      }

      const delResult = (await db.query(sql, req))[0].affectedRows;

      if (delResult) {
        return { success: true };
      }

      return { success: false };
    } catch (e) {
      console.log("deleteComment 에러 : ", e);
      return { success: false };
    }
  }
}

module.exports = TodoCommentStorage;
