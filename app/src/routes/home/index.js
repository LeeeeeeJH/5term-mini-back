"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// 회원가입
//아이디 중복체크
//닉네임 중복체크
router.post("/login", ctrl.sign.login);
router.post("/register", ctrl.sign.register);
router.post("/check/id", ctrl.sign.idCheck);
router.post("/check/nickname", ctrl.sign.nicknameCheck);

module.exports = router;
