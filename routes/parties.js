const express = require("express");
const router = express.Router();
const controller = require("../controller/Cparties");
const verifyController = require("../controller/Cverify");

router.post("/verify", verifyController.verify);

router.get("/", controller.index);

router.get("/write", controller.write);

router.post("/write", controller.writePost);

module.exports = router;
