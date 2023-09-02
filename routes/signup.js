const express = require("express");
const router = express.Router();
const controller = require("../controller/Csignup");

router.get("/", controller.index);

router.post("/", controller.signupPost);

module.exports = router;
