"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");
const { upload } = require("../../config/s3");

router.get("/:userId/months/:date", ctrl.diary.getSelectDiary); //처음에 프론트단에 사용자의 데이터 조회
router.get("/:userId/:date", ctrl.diary.getDiary); //해당하는 날짜의 다이어리 조회
router.post("/:userId/:date", upload.single("image"), ctrl.diary.createDiary); //다이어리 생성
router.delete("/:userId/:diaryNo", ctrl.diary.deleteDiary); //다이어리 삭제
router.put("/:userId/:date/:diaryNo", upload.single("image"), ctrl.diary.updateDiary); //다이어리 수정

module.exports = router;
