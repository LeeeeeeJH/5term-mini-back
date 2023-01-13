"use strict";

const Todo = require("../../models/todo/todo");
const User = require("../../models/user");

//로그인 회원가입
const sign = {
  login: (req, res) => {
    return res.json({ sucess: true });
  },
  register: (req, res) => {
    const user = new User();
    const response = user.register();
    return res.json(response);
  },
};

const info = {
  getInfo: async (req, res) => {
    const todo = new Todo();
    const response = await todo.getTodoList(req.body);

    return res.json(response);
  },

  getCnt: async (req, res) => {
    const todo = new Todo();
    const response = await todo.getTodoCnt(req.body);

    return res.json(response);
  },

  addTodo: async (req, res) => {
    const todo = new Todo();
    const response = await todo.addTodoList(req.body);

    return res.json(response);
  },
  editTodo: async (req, res) => {
    const todo = new Todo();
    const response = await todo.editTodo(req.body);

    return res.json(response);
  },
  deleteTodo: async (req, res) => {
    const todo = new Todo();
    const response = await todo.deleteTodo(req.body);

    return res.json(response);
  },
};
module.exports = {
  sign,
  info,
};
