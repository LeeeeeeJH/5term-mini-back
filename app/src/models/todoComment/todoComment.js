"use strict";

const TodoCommentStorage = require("./todoCommentStorage");
const DataCheck = require("../dataCheck");

class TodoComment {
  async getComment(params) {
    const response = await TodoCommentStorage.getComment(params);

    return response;
  }

  async addComment(body) {
    const user_no = await DataCheck.getUserNo(body.user_id);
    const writer_no = await DataCheck.getUserNo(body.writer_id);
    const response = await TodoCommentStorage.addComment(
      body,
      user_no,
      writer_no
    );

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
