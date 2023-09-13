const express = require("express");
const router = express.Router();
const controller = require("../controller/CsignupHobby");

router.get("/", controller.index);
module.exports = router;
