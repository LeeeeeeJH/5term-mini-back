"use strict"

const db = require("../../config/db");
class ProfileStorage {
    static updateProfile(userId,body) {
        return new Promise((resolve, reject) => {
            const values = [
                body.password,
                body.name,
                body.phone,
                body.nickname,
                body.email,
                body.image,
                userId
            ]
            const query = "UPDATE user SET password = ?,name = ?, phone = ?, nickname = ?, email = ?,image = ? WHERE id = ?;";
            db.query(query, values, (err) => {
                if (err) reject(err);
                resolve({ success: true });
            });
        });
    }

    static readProfile(userId) {
        return new Promise((resolve, reject) => {
            const query = "SELECT id,password,name,phone,nickname,email,image FROM user WHERE id = ?;";
            db.query(query,[userId], (err,data) => {
            if (err) reject(err);
            resolve(data);
            });
        });
    }

    static readFriendProfile(userId) {
        return new Promise(async(resolve, reject) => {
            const query = "SELECT id,name,phone,nickname,email,image FROM user WHERE id = ?;";
            db.query(query, [userId], (err, data) => {
            if (err) reject(err);
            resolve(data);
            });
        });
    }
}

module.exports = ProfileStorage;