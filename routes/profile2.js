const express = require("express");
const router = express.Router();
const controller = require("../controller/Cprofile2");

router.get("/", controller.index);

module.exports = router;
