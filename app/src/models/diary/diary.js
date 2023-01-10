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

     async deleteDiary({id}) {
        try {
            const response = await DiaryStorage.deleteDiary(id)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }

    async updateDiary({id}, {date,title,content,image}) {
        try {
            const response = await DiaryStorage.updateDiary(id,date,title,content,image)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }

    async readDiary({id}) {
        try {
            const response = await DiaryStorage.readDiary(id)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }
}

module.exports = Diary