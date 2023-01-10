"use strict"

const db = require("../../config/db");

class DiaryStorage {
    static async createDiary(user_no,date,title,content,image) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO diary(user_no,date,title,content,image) VALUES(?,?,?,?,?);";
            db.query(query, [user_no,date,title,content,image], (err) => {
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

    static async updateDiary(id,date,title,content,image) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE diary SET date = ?,title = ?, content = ?, image = ? WHERE no = ?;";
            db.query(query, [date, title, content, image, id], (err) => {
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
          

}

module.exports = DiaryStorage;