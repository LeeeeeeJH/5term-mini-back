"use strict";

const Todo = require("../../models/todo/todo");
const User = require("../../models/user/user");

const Friends = require("../../models/user/friends");
const FriendsStorage = require("../../models/user/friendsStorage");

//로그인 회원가입
const sign = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login(req.body);
    return res.json(response);
  },

  check: async (req, res) => {
    const user = new User(req.body);
    const response = await user.check(req.body);
    return res.json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register(req.body);
    return res.json(response);
  },
};

const relation = {
  read: async (req, res) => {
    const user = req.params.userId;
    const request = await new Friends(user);
    const response = await request.read(user);
    return res.json(response);
  },
  send: async (req, res) => {
    const request = await new Friends(req.body);
    const response = request.send(req.body);
    return res.json(response);
  },
  aceppt: async (req, res) => {
    const request = new Friends(req.body);
    const response = await request.aceppt(req.body);
    return res.json(response);
  },
  reject: async (req, res) => {
    const request = new Friends(req.body);
    const response = await request.reject(req.body);
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
  relation,
};
