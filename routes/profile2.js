const express = require("express");
const router = express.Router();
const controller = require("../controller/Cprofile2");

router.get("/", controller.index);

router.get("/info", controller.info);
module.exports = router;
