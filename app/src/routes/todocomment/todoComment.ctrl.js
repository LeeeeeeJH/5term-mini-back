"use strict";
const TodoComment = require("../../models/todo/conmmet/todoComment");

const todoComment = {
  getTodoComment: async (req, res) => {
    const todoComment = new TodoComment();
    const response = await todoComment.getComment(req.params);

    return res.json(response);
  },

  addTodoComment: async (req, res) => {
    const todoComment = new TodoComment();
    const response = await todoComment.addComment(req.body);

    return res.json(response);
  },

  editTodoComment: async (req, res) => {
    const todoComment = new TodoComment();
    const response = await todoComment.editComment(req.body);

    return res.json(response);
  },

  deleteTodoComment: async (req, res) => {
    const todoComment = new TodoComment();
    const response = await todoComment.deleteComment(req.body);

    return res.json(response);
  },
};

module.exports = {
  todoComment,
};
