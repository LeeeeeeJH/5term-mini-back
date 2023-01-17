"use strict";

const TodoStorage = require("./todoStorage");

class TodoComment {
  constructor(body) {
    this.body = body;
  }
  async getComment() {}

  async addComment() {}

  async editComment() {}

  async deleteComment() {}
}

module.exports = TodoComment;
