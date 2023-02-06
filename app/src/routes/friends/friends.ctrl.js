"use strict";

const Friends = require("../../models/user/friends");

const friends = {
  getList: async (req, res) => {
    const user = req.params.userId;
    const request = new Friends(user);
    const response = await request.getList(user);

    return res.json(response);
  },

  send: async (req, res) => {
    const request = new Friends(req.body);
    const response = await request.send(req.body);

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

  search: async (req, res) => {
    const request = new Friends(req.body);
    const response = await request.search(req.body);
    return res.json(response);
  },
};

module.exports = { friends };
