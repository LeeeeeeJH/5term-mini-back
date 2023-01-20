"use strict"

const db = require("../../config/db");
const DataCheck = require("../dataCheck");
class DiaryStorage {
    static createDiary(params,body) {
        return new Promise(async (resolve, reject) => {
            const user_no = await DataCheck.getUserNo(params.userId);
            const values = [
                user_no,
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
    static deleteDiary(params) {
        return new Promise(async(resolve, reject) => {
          const values = [
            user_no,
            params.date
          ]
          const query = "DELETE FROM diary WHERE no = ?;";
          db.query(query, values, (err) => {
            if (err) reject(err);
            resolve({success : true});
          });
        });
    };

    static updateDiary(params,body) {
        return new Promise(async(resolve, reject) => {
            const values = [
              body.date,
              body.title,
              body.content,
              body.image,
              params.diaryNo
            ]
            const query = "UPDATE diary SET date = ?,title = ?, content = ?, image = ? WHERE no = ?;";

            db.query(query, values, (err) => {
                if (err) reject(err);
                resolve({ success: true });
            });
        });
    }

    static readDiary(params) {
        return new Promise(async(resolve, reject) => {
          const user_no = await DataCheck.getUserNo(params.userId)
          const values = [
            params.date,
            user_no
          ]
          const query = "SELECT no,date, title, content, image FROM diary WHERE DATE_FORMAT(diary.date,'%y-%m-%d') = ? AND user_no = ?;";
          db.query(query,values, (err,data) => {
          if (err) reject(err);
          resolve(data);
          });
        });
    }

    static readSelectDiary(params) {
        return new Promise(async(resolve, reject) => {
            const user_no = await DataCheck.getUserNo(params.userId)
            const values = [
                params.date,
                user_no
            ]
            const query = "SELECT DATE_FORMAT(diary.date,'%d') AS days FROM diary WHERE DATE_FORMAT(diary.date,'%y-%m') = ? AND user_no = ? ORDER BY days";
            db.query(query, values, (err, data) => {
                const diaryDay = [];
                for (let i of data) {
                    diaryDay.push(i.days); 
                }
                if (err) reject(err);
                resolve(diaryDay);
            });
        });
    }

    static createDiaryLike(params) {
        return new Promise(async (resolve, reject) => {
            const user_no = await DataCheck.getUserNo(params.userId);
            const values = [
                Number(params.diaryNo),
                user_no
            ];
            const query = "INSERT INTO diary_likes(diary_no,liker_no) VALUES(?,?);";
            db.query(query, values, (err) => {
              if (err) reject(err);
              resolve({success:true});
            });
          });
    }        
    static deleteDiaryLike(params) {
        return new Promise(async(resolve, reject) => {
          const user_no = await DataCheck.getUserNo(params.userId);
          const values = [
            user_no,
            params.diaryNo
          ]
          const query = "DELETE FROM diary_likes WHERE liker_no = ? AND diary_no = ?;";
          db.query(query, values, (err) => {
            if (err) reject(err);
            resolve({success : true});
          });
        });
    };

    static readDiaryLike(params) {
        return new Promise((resolve, reject) => {
            const query = "SELECT COUNT(liker_no) FROM diary_likes WHERE diary_no = ?;";
            db.query(query, params.diaryNo, (err,data) => {
            if (err) reject(err);
            resolve(data);
            });
        });
    }
}

module.exports = DiaryStorage;