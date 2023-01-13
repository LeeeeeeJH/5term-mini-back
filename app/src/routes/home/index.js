"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// router.get("/",)
router.post("/login", ctrl.sign.login);
router.post("/register", ctrl.sign.register);

router.get("/diaries/:userId", ctrl.process.getSelectDiary) //처음에 프론트단에 사용자의 데이터 조회
router.get("/diaries/:userId/main/:diaryId", ctrl.process.getDiary) //해당하는 날짜의 다이어리 조회
// router.get("/diaries/", ctrl.process.getSelectDiary)
router.post("/diaries/:userId/main", ctrl.process.createDiary); //다이어리 생성
router.delete("/diaries/:userId/main/:diaryId", ctrl.process.deleteDiary); //다이어리 삭제
router.patch("/diaries/:userId/main/:diaryId", ctrl.process.updateDiary); //다이어리 수정
router.get("/diaries/:userId/main/:diaryId/comment", ctrl.process.getDiaryComment)

module.exports = router;