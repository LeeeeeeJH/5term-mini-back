"use strict";

const express = require("express");
const router = express.Router();

const signCtrl = require("./sign.ctrl");

// 회원가입
router.post("/register", signCtrl.sign.register);
// 로그인
router.post("/login", signCtrl.sign.login);
//아이디 중복체크
router.post("/check", signCtrl.sign.check);

module.exports = router;
