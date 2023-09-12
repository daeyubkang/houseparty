const express = require("express");
const router = express.Router();
const controller = require("../controller/Cprofile2.js");
const controllerImg = require("../controller/CimageUpload.js");

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const s3 = new AWS.S3({
  accessKeyId: "AKIAQ3LKGDPFBZJF7DHN",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

const imageUpload = multer({
  storage: multerS3({
    s3,
    bucket: "housepartybucket",
    acl: "public-read",
    //contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, callback) {
      callback(null, { fieldName: file.fieldname });
    },
    key: (req, file, callback) => {
      callback(
        null,
        `profile_img/${Date.now().toString()}_${file.originalname}`
      );
    },
  }),
});

router.get("/", controller.index);

router.get("/info", controller.info);

router.post("/edit", controller.eidtProfile);
router.post("/upload", imageUpload.single("image"), controllerImg.uploadImage);

module.exports = router;
