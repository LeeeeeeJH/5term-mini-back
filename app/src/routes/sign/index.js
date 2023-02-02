"use strict";

const express = require("express");
const router = express.Router();

const signCtrl = require("./sign.ctrl");

// 회원가입
router.post("/sign/register", signCtrl.sign.register);
// 로그인
router.post("/sign/login", signCtrl.sign.login);
//아이디 중복체크
router.post("/sign/check", signCtrl.sign.check);

module.exports = router;
