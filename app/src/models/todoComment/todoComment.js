"use strict";

const TodoCommentStorage = require("./todoCommentStorage");
const DataCheck = require("../user/dataCheck");

class TodoComment {
  async getComment(params) {
    const result = await TodoCommentStorage.getComment(params);

    return result;
  }

  async createComment(body) {
    const user_no = await DataCheck.getUserNo(body.user_id);
    const writer_no = await DataCheck.getUserNo(body.writer_id);

    const createResult = await TodoCommentStorage.createComment(
      body,
      user_no,
      writer_no
    );

    if (!createResult.affectedRows) {
      return { success: false };
    }

    return { success: true, cmtNo: createResult.insertId };
  }

  async editComment(body) {
    const editResult = await TodoCommentStorage.editComment(body);

    if (!editResult) {
      return { success: false };
    }

    return { success: true };
  }

  async deleteComment(body) {
    const deleteResult = await TodoCommentStorage.deleteComment(body);

    if (!deleteResult) {
      return { success: false };
    }

    return { success: true };
  }
}

module.exports = TodoComment;
