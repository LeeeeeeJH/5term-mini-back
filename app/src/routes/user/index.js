"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./user.ctrl");

// 회원가입
router.post("/register", ctrl.sign.register);
// 로그인
router.post("/login", ctrl.sign.login);
//아이디 중복체크
router.post("/check", ctrl.sign.check);

module.exports = router;
