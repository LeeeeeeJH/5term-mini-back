"use strict"

const {respons} = require("express");
const DiaryStorage = require("./diaryStorage");
class Diary {
    constructor() {}

     async createDairy(body,params) {
        try {
            const response = await DiaryStorage.createDiary(params.id,body.date,body.title,body.content,body.image)

            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }

     async deleteDiary({no}) {
        try {
            const response = await DiaryStorage.deleteDiary(no)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }

    async updateDiary({id}, {description}) {
        try {
            const response = await DiaryStorage.updateDiary(id,description)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }

    async readDiary() {
        try {
            const response = await DiaryStorage.readDiary()
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }
}

module.exports = Diary