"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// 회원가입
router.post("/register", ctrl.sign.register);

// 로그인
router.post("/login", ctrl.sign.login);
//아이디 중복체크
router.post("/check", ctrl.sign.check);

router.post("/todo/getTodoList", ctrl.info.getInfo);
router.post("/todo", ctrl.info.getCnt);
router.post("/todo/add", ctrl.info.addTodo);
router.patch("/todo/edit", ctrl.info.editTodo);
router.delete("/todo/delete", ctrl.info.deleteTodo);

// 친구요청 보내기
router.post("/friends/request", ctrl.relation.send);
// 친구요청 수락
router.patch("/friends/request", ctrl.relation.aceppt);
// 친구요청 거절
router.delete("/friends/request", ctrl.relation.reject);
// 친구요청 조회
router.get("/friends/request", ctrl.relation.read);

module.exports = router;
