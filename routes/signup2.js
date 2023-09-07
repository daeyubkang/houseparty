const express = require("express");
const router = express.Router();
const controller = require("../controller/Csignup2");

router.get("/", controller.index);
module.exports = router;
