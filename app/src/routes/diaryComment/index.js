"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");

router.get("/:userId/:diaryNo", ctrl.diaryComment.getDiaryComment); //해당하는 날짜의 다이어리 조회
router.post("/:userId/:diaryNo", ctrl.diaryComment.createDiaryComment); //다이어리 생성
router.delete("/:userId/:id", ctrl.diaryComment.deleteDiaryComment); //다이어리 삭제
router.patch("/:userId/:id", ctrl.diaryComment.updateDiaryComment);

module.exports = router;
