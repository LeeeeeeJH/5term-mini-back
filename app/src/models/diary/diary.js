"use strict"
const DiaryStorage = require("./diaryStorage");
class Diary {
    constructor() {}

     async createDairy(params, body) {
        try {
            const response = await DiaryStorage.createDiary(params,body)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 생성 실패"};
        }
    }

     async deleteDiary(params) {
        try {
            const response = await DiaryStorage.deleteDiary(params)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 삭제 실패"};
        }
    }

    async updateDiary(params, body) {
        try {
            const response = await DiaryStorage.updateDiary(params,body)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 수정 실패"};
        }
    }

    async readDiary(params) {
        try {
            const response = await DiaryStorage.readDiary(params)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 조회 실패"};
        }
    }

    async readSelectDiary(params) {
        try {
            const response = await DiaryStorage.readSelectDiary(params)
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

     async deleteDiaryLike(params) {
        try {
            const response = await DiaryStorage.deleteDiaryLike(params)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 좋아요 삭제 실패"};
        }
    }

    async readDiaryLike(params) {
        try {
            const response = await DiaryStorage.readDiaryLike(params)
            return response
        }
        catch(err) {
            return {success: false, msg:"다이어리 좋아요 조회 실패"};
        }
    }
}


module.exports = Diary