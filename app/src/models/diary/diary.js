"use strict"

const {respons} = require("express");
const DiaryStorage = require("./diaryStorage");
class Diary {
    constructor() {}

     async createDairy(user_no, body) {
        try {
            const response = await DiaryStorage.createDiary(user_no,body)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 생성 실패!!"};
        }
    }

     async deleteDiary({diaryId}) {
        try {
            const response = await DiaryStorage.deleteDiary(diaryId)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 삭제 실패!!"};
        }
    }

    async updateDiary({diaryId}, body) {
        try {
            const response = await DiaryStorage.updateDiary(diaryId,body)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 수정 실패!!"};
        }
    }

    async readDiary({diaryId}) {
        try {
            const response = await DiaryStorage.readDiary(diaryId)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 조회 실패!"};
        }
    }

    async readSelectDiary({userId}) {
        try {
            const response = await DiaryStorage.readSelectDiary(userId)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }
    async readDiaryComment({diaryId}) {
        try {
            const response = await DiaryStorage.readDiaryComment(diaryId)
            return response
        }
        catch(err) {
            return {success: false, msg:"댓글 조회 실패!!"};
        }
    }
}

module.exports = Diary