"use strict";

const Friends = require("../../models/friends/friends");

const friends = {
  getFriendsList: async (req, res) => {
    const user = req.params.userId;
    const request = new Friends(user);
    const response = await request.getList(user);

    return res.json(response);
  },

  getWaitingList: async (req, res) => {
    const user = req.params.userId;
    const request = new Friends(user);
    const response = await request.getWaitingList(user);

    return res.json(response);
  },

  send: async (req, res) => {
    try {
      const request = new Friends(req.body);
      const response = await request.send(req.body);

      return res.json(response);
    } catch (error) {
      console.log("컨트롤러", error);
      return res.json({ success: false });
    }
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
    const user = req.params.myId;
    const search = req.params.nickname;
    if (!user) {
      return res.json({ success: false });
    }
    const request = new Friends(user);
    const response = await request.search(user, search);

    return res.json(response);
  },
};

module.exports = { friends };
