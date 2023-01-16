"use strict";
const ProfileStorage = require("./profileStorage");
class Profile {
    constructor() {}

    async updateProfile({userId}, body) {
        try {
            const response = await ProfileStorage.updateProfile(userId,body)
            return response
        }
        catch(err) {
            return {success: false, msg:"프로필 수정 실패!!"};
        }
    }

    async readProfile({userId}) {
        try {
            const response = await ProfileStorage.readProfile(userId)
            return response
        }
        catch(err) {
            return {success: false, msg:"프로필 조회 실패!"};
        }
    }

    async readFriendProfile({userId}) {
        try {
            const response = await ProfileStorage.readFriendProfile(userId)
            return response
        }
        catch(err) {
            return {success: false, msg:err};
        }
    }
}


module.exports = Profile;