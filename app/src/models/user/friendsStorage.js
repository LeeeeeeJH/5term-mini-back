"use strict";

const { resolveInclude } = require("ejs");
const db = require("../../config/db");
const Friends = require("./friends");

class FriendsStorage {
  static send(body) {
    const sql = "INSERT INTO friends_list (sender,receiver) VALUES (?,?)";
    const values = [body.sender, body.receiver];
    db.query(sql, values, function (err, result, fields) {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports = FriendsStorage;
