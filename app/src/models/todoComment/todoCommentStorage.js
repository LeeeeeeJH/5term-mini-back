"use strict";
const db = require("../../config/db");

class TodoCommentStorage {
  static async getComment({ date, id }) {
    try {
      const req = [date, id];
      const sql = `SELECT todo_comment.no, todo_comment.content, writer.id AS writer 
        FROM todo_comment 
        INNER JOIN user ON todo_comment.user_no = user.no 

        INNER JOIN user AS writer ON todo_comment.writer_no = writer.no 
        WHERE DATE_FORMAT(todo_comment.date, '%Y-%c-%e') = ? AND user.id = ? 
        GROUP BY todo_comment.no;`;

      const result = await db.query(sql, req);
      return result[0];
    } catch (error) {
      console.log("getComment 에러 : ", error);
      return { success: false };
    }
  }

  static async createComment({ date, content }, user_no, writer_no) {
    try {
      const sql =
        "INSERT INTO todo_comment (user_no, writer_no, date, content) VALUES (?,?,DATE_FORMAT(?, '%Y-%c-%e'),?);";

      const req = [user_no, writer_no, date, content];

      const createResult = (await db.query(sql, req))[0];

      return createResult;
    } catch (error) {
      console.log("addComment 에러 : ", error);
      return false;
    }
  }

  static async editComment({ content, cmtNo }) {
    try {
      const sql = "UPDATE todo_comment SET content= ? WHERE no= ?;";
      const req = [content, cmtNo];
      const editResult = (await db.query(sql, req))[0].affectedRows;

      return editResult;
    } catch (error) {
      console.log("editComment 에러 : ", error);
      return false;
    }
  }

  static async deleteComment({ cmtNo }) {
    try {
      const sql = "DELETE FROM todo_comment WHERE no= ?";
      const req = cmtNo;

      const deleteResult = (await db.query(sql, req))[0].affectedRows;

      return deleteResult;
    } catch (error) {
      console.log("deleteComment 에러 : ", error);
      return false;
    }
  }
}

module.exports = TodoCommentStorage;
