const express = require("express");
const router = express.Router();
const controller = require("../controller/Cparties");
const controllerImg = require("../controller/CimageUpload");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const verifyController = require("../controller/Cverify");

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

router.post("/verify", verifyController.verify);

router.get("/", controller.index);

//진짜  게시글작성
router.get("/host", controller.hostParty);
router.post("/host", controller.hostPartyPost);
router.post(
  "/host/upload",
  imageUpload.array("image", 10),
  controllerImg.uploadImages
);

router.get("/parties", controller.search);

//게시글별 파티 상세페이지
router.get("/:partyNum", controller.partyDetail);

//게시글 수정
router.get("/host/:partyNum", controller.editParty);
router.put("/host/:partyNum", controller.editPartyPost);

//게시글 삭제
router.delete("/:partyNum", controller.deleteParty);

module.exports = router;
