// const express = require("express");
// const router = express.Router();
// const controller = require("../controller/Cprofile");
// const verifyController = require("../controller/Cverify");

// router.post("/verify", verifyController.verify);

// // function requireLogin(req, res, next) {
// //   if (req.isAuthenticated()) {
// //     // 사용자가 로그인한 경우
// //     return next(); // 다음 미들웨어 또는 핸들러로 이동
// //   }
// //   // 로그인되지 않은 경우, 로그인 페이지 또는 다른 경로로 리디렉션
// //   res.redirect("/login");
// // }

// // router.get("/", requireLogin, controller.index);
// // router.get("/", controller.index);

// router.post("/", controller.changeProfile);

// // router.get("/", changePWcontroller.changePassword);

// module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../controller/Cprofile.js");
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

module.exports = router;
