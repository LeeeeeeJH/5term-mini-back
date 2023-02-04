const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const path = require("path");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      // const ext = path.extname(file.originalname);
      const id = `diaryId-${req.params.userId}-${req.params.date}`;
      const uploadDirectory = req.query.directory ?? "";
      if (uploadDirectory === "user") {
        id = `userNo-${req.params.userId}`;
        return id;
      }
      cb(null, `${uploadDirectory}/` + `${id}`);
    },
  }),
});
exports.upload = multer(upload);
