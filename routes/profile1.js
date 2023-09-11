const express = require("express");
const router = express.Router();
const controller = require("../controller/Cprofile1");

router.get("/", controller.index);

router.post("/checkPW", controller.checkPW);
router.post("/editPW", controller.editPW);

module.exports = router;
