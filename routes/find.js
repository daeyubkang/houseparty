const express = require("express");
const router = express.Router();
const controller = require("../controller/Cfind");

router.get("/", controller.index);

router.post("/findId", controller.findId);

router.post("/updatePw", controller.updatePw);

router.post("/EmailAuthentication", controller.EmailAuthentication);

module.exports = router;
