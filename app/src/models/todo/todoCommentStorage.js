"use strict";
const db = require("../../config/db");
const DataCheck = require("../dataCheck");

class TodoCommentStorage {
  static async getComment(client) {
    const req = [client.date, client.id];
    const sql =
      "SELECT todo_comment.no, todo_comment.content, writer.id AS writer " +
      "FROM todo_comment " +
      "INNER JOIN user ON todo_comment.user_no = user.no " +
      "INNER JOIN user AS writer ON todo_comment.writer_no = writer.no " +
      "WHERE todo_comment.date = ? AND user.id = ? " +
      "GROUP BY todo_comment.no;";
    const result = await db.query(sql, req);

    return result[0];
  }

  static async addComment(client) {
    const sql =
      "INSERT INTO todo_comment (user_no, writer_no, date, content) VALUES (?,?,?,?)";
    const user_no = await DataCheck.getUserNo(client.user_id);
    const writer_no = await DataCheck.getUserNo(client.writer_id);
    const req = [user_no, writer_no, client.date, client.content];
    const result = { success: false };
    const isCheck = (await db.query(sql, req))[0].affectedRows;
    if (isCheck) result.success = true;

    return result;
  }

  static async editComment(client) {
    const sql = "UPDATE todo_comment SET content= ? WHERE no= ?;";
    const req = [client.content, client.no];
    const result = { success: false };
    const isCheck = (await db.query(sql, req))[0].affectedRows;
    if (isCheck) result.success = true;

    return result;
  }

  static async deleteComment(client) {
    let sql, req;
    const result = { success: false };
    if (client === 0) {
      return (result.success = true);
    }
    if (!client.id) {
      sql = "DELETE FROM todo_comment WHERE date= ?";
      req = client;
    } else {
      sql = "DELETE FROM todo_comment WHERE no= ?";
      req = client.id;
    }
    const isCheck = (await db.query(sql, req))[0].affectedRows;
    if (isCheck) result.success = true;

    return result;
  }
}

module.exports = TodoCommentStorage;
