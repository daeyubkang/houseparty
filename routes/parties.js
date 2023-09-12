const express = require("express");
const router = express.Router();
const controller = require("../controller/Cparties");
const verifyController = require("../controller/Cverify");

router.post("/verify", verifyController.verify);

router.get("/", controller.index);

//구  게시글작성
router.get("/write", controller.write);
router.post("/write", controller.writePost);

//진짜  게시글작성
router.get("/host", controller.hostParty);
router.post("/host", controller.hostPartyPost);

router.get("/parties", controller.search);

//게시글별 파티 상세페이지
router.get("/:partyNum", controller.partyDetail);

//게시글 수정
router.get("/host/:partyNum", controller.editParty);
router.put("/:partyNum", controller.editPartyPost);

//게시글 삭제
router.delete("/:partyNum", controller.deleteParty);

module.exports = router;
