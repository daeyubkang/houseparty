const express = require("express");
const router = express.Router();
const verifyController = require("../controller/Cverify");

router.post("/", verifyController.verify);

module.exports = router;
