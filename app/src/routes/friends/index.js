"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./friends.ctrl");

// 친구목록 조회
router.get("/friends/:userId", ctrl.friends.getList);
// 친구요청 보내기
router.post("/friends/request", ctrl.friends.send);
// 친구요청 수락
router.patch("/friends/request", ctrl.friends.aceppt);
// 친구요청 거절
router.delete("/friends/request", ctrl.friends.reject);

module.exports = router;
