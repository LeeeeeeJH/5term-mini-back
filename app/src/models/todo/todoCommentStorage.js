"use strict";
const db = require("../../config/db");
const DataCheck = require("../dataCheck");

class TodoCommentStorage {
  static getComment() {}

  static addComment(client) {
    return new Promise(async (resolve, reject) => {
      const sql =
        "INSERT INTO todo_comment (user_no, writer_no, date, content) VALUES (?,?,?,?)";
      console.log(client.user_id);
      const user_no = await DataCheck.getUserNo(client.user_id);
      const writer_no = await DataCheck.getUserNo(client.writer_id);
      const req = [user_no, writer_no, client.date, client.content];
      console.log(req);
      db.query(sql, req, (err) => {
        if (err) {
          console.log(err);
          reject({ success: false });
        }
        resolve({ success: true });
      });
    });
  }

  static editComment(client) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE todo_comment SET content= ? WHERE no= ?;";

      const req = [client.content, client.no];

      db.query(sql, req, (err) => {
        if (err) {
          console.log(err);
          reject({ success: false });
        }
        resolve({ success: true });
      });
    });
  }

  static deleteComment(client) {
    return new Promise((resolve, reject) => {
      console.log(client);
      const sql = "DELETE FROM todo_comment WHERE no= ?";
      const req = [client.id];
      db.query(sql, req, (err) => {
        if (err) {
          console.log(err);
          reject({ success: false });
        }
        resolve({ success: true });
      });
    });
  }
}

module.exports = TodoCommentStorage;
