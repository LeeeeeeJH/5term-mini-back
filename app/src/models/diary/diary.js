"use strict"

const {respons} = require("express");
const DiaryStorage = require("./diaryStorage");
class Diary {
    constructor() {}

     async createDairy(user_no,body) {
        try {
            const response = await DiaryStorage.createDiary(user_no,body)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }

     async deleteDiary({diaryId}) {
        try {
            const response = await DiaryStorage.deleteDiary(diaryId)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }

    async updateDiary({diaryId}, body) {
        try {
            const response = await DiaryStorage.updateDiary(diaryId,body)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }

    async readDiary({diaryId}) {
        try {
            const response = await DiaryStorage.readDiary(diaryId)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
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
}

module.exports = Diary