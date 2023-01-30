"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/:diaryNo", ctrl.diaryLike.getDiaryLike); //좋아요 확인
router.post("/:diaryNo/likers/:userId", ctrl.diaryLike.createDiaryLike); //좋아요 추가
router.delete("/:diaryNo/likers/:userId", ctrl.diaryLike.deleteDiaryLike); //좋아요 삭제

module.exports = router;
