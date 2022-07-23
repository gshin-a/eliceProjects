import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_KEYID,
  secretAccessKey: process.env.S3_PRIVATE_KEY,
  region: process.env.REGION,
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

exports.upload = multer(upload);
