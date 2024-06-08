require("dotenv").config();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, BUCKET_NAME } = process.env;

const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const getFileKey = (file, folder) => {
  if (!file) return false;
  const name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + path.extname(file.originalname);
  return `${folder}/${name}`;
};

const uploadS3AdminProfile = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: (req, file, callBack) => callBack(null, { fieldName: file.fieldname }),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    serverSideEncryption: "AES256",
    cacheControl: "max-age=31536000",
    key: (req, file, cb) => cb(null, getFileKey(file, "admin")),
  }),
});

module.exports = {
  uploadS3AdminProfile: uploadS3AdminProfile,
};
