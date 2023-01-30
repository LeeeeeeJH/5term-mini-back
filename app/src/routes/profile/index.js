"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/:userId", ctrl.profile.getProfile); //자신의 프로필 조회
router.get("/:userId/friends/:userId", ctrl.profile.getFriendProfile); //친구의 프로필 조회
router.patch("/:userId", ctrl.profile.updateProfile); //프로필 수정

module.exports = router;
