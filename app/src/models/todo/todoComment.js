"use strict";

const TodoCommentStorage = require("./todoCommentStorage");

class TodoComment {
  constructor(body) {
    this.body = body;
  }
  async getComment(body) {
    const response = await TodoCommentStorage.getComment(body);

    return response;
  }

  async addComment(body) {
    const response = await TodoCommentStorage.addComment(body);

    return response;
  }

  async editComment(body) {
    const response = await TodoCommentStorage.editComment(body);

    return response;
  }

  async deleteComment(body) {
    const response = await TodoCommentStorage.deleteComment(body);

    return response;
  }
}

module.exports = TodoComment;
