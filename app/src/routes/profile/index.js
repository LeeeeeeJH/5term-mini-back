"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");
const { upload } = require("../../config/s3");

router.get("/:userId", ctrl.profile.getProfile); //자신의 프로필 조회
router.put("/:userId", upload.single("image"), ctrl.profile.updateProfile); //프로필 수정

module.exports = router;
