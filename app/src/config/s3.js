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
      console.log(req);
      // const ext = path.extname(file.originalname);
      const id = `id-${req.params.userId}-${req.params.date}`;
      const uploadDirectory = req.query.directory ?? "";
      cb(null, `${uploadDirectory}/` + `${id}`);
    },
  }),
});

function delete_file(req) {
  console.log(req.params);
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `diary/id-${req.params.userId}-${req.params.date}`,
  };

  try {
    s3.deleteObject(params, function (error, data) {
      if (error) {
        console.log("err: ", error, error.stack);
      } else {
        console.log(data, " 정상 삭제 되었습니다.");
      }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}
module.exports = {
  upload,
  delete_file,
};
