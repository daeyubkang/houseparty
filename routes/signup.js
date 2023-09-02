const express = require("express");
const router = express.Router();
const controller = require("../controller/Csignup");

router.get("/", controller.index);

module.exports = router;
