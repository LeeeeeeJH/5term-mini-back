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
            const query = "DELETE FROM diary WHERE user_no = ?;";
            db.query(query, [id], (err) => {
              if (err) reject(err);
              resolve({success : true});
            });
          });
        };

    static async updateDiary(id,title,content,image) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE Diary SET title = ?, content = ?, image = ? WHERE id = ?;";
            db.query(query, [title, content, image, id], (err) => {
                if (err) reject(err);
                resolve({ success: true });
            });
            });
        }

        static async readDiary() {
          return new Promise((resolve, reject) => {
              const query = "SELECT * FROM Diary;";
              db.query(query, (err,data,a) => {
                if (err) reject(err);
                resolve({data});
              });
            });
          }
          

}

module.exports = DiaryStorage;