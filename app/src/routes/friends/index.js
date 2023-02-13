"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./friends.ctrl");

// 친구목록 조회
router.get("/:userId/getlist", ctrl.friends.getFriendsList);
router.get("/:userId/waiting", ctrl.friends.getWaitingList);
// 친구요청 보내기
router.post("/request", ctrl.friends.send);
// 친구요청 수락
router.patch("/request", ctrl.friends.aceppt);
// 친구요청 거절
router.delete("/request", ctrl.friends.reject);

router.get("/:myId/search/:nickname?", ctrl.friends.search);
module.exports = router;
