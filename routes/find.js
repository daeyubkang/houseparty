const express = require("express");
const router = express.Router();
const controller = require("../controller/Cfind");

router.get("/", controller.index);

module.exports = router;
