"use strict"
const DiaryStorage = require("./diaryStorage");
class Diary {
    constructor() {}

     async createDairy(user_id, body) {
        try {
            const response = await DiaryStorage.createDiary(user_id,body)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 생성 실패"};
        }
    }

     async deleteDiary({diaryId}) {
        try {
            const response = await DiaryStorage.deleteDiary(diaryId)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 삭제 실패"};
        }
    }

    async updateDiary({diaryId}, body) {
        try {
            const response = await DiaryStorage.updateDiary(diaryId,body)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 수정 실패"};
        }
    }

    async readDiary({diaryId}) {
        try {
            const response = await DiaryStorage.readDiary(diaryId)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 조회 실패"};
        }
    }

    async readSelectDiary({userId}) {
        try {
            const response = await DiaryStorage.readSelectDiary(userId)
            return response
        }
        catch(err) {
            return {success: false, msg:"사용자의 다이어리 조회 실패"};
        }
    }

    async createDairyLike(params) {
        try {
            const response = await DiaryStorage.createDiaryLike(params)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 좋아요 추가 실패"};
        }
    }

     async deleteDiaryLike({diaryId}) {
        try {
            const response = await DiaryStorage.deleteDiaryLike(diaryId)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 좋아요 삭제 실패"};
        }
    }

    async readDiaryLike({diaryId}) {
        try {
            const response = await DiaryStorage.readDiaryLike(diaryId)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 좋아요 조회 실패"};
        }
    }
}


module.exports = Diary