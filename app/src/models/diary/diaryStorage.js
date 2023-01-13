"use strict"

const db = require("../../config/db");

class DiaryStorage {
    static async createDiary(user_no,body) {
        return new Promise((resolve, reject) => {
            const values = [
                user_no.userId,
                body.date,
                body.title,
                body.content,
                body.image
            ];
            const query = "INSERT INTO diary(user_no,date,title,content,image) VALUES(?,?,?,?,?);";
            db.query(query, values, (err) => {
              if (err) reject(err);
              resolve({success:true});
            });
          });
    }        
    static async deleteDiary(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM diary WHERE no = ?;";
            db.query(query, [id], (err) => {
              if (err) reject(err);
              resolve({success : true});
            });
          });
    };

    static async updateDiary(id,body) {
        return new Promise((resolve, reject) => {
            const values = [
                body.date,
                body.title,
                body.content,
                body.image,
                id
            ]
            const query = "UPDATE diary SET date = ?,title = ?, content = ?, image = ? WHERE no = ?;";

            db.query(query, values, (err) => {
                if (err) reject(err);
                resolve({ success: true });
            });
        });
    }

    static async readDiary(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT date, title, content, image FROM diary WHERE no = ?;";
            db.query(query,[id], (err,data) => {
            if (err) reject(err);
            resolve({data});
            });
        });
    }

    static async readSelectDiary(user_no) {
        return new Promise((resolve, reject) => {
            const query = "SELECT no, user_no, date FROM diary WHERE user_no = ?;";
            db.query(query, [user_no], (err, data) => {
            if (err) reject(err);
            resolve({data});
            });
        });
    }

}

module.exports = DiaryStorage;