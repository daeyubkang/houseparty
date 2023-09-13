const express = require("express");
const router = express.Router();
const controller = require("../controller/Cprofile4");

router.get("/", controller.index);

router.get("/info", controller.info);

router.post("/hobby", controller.editHobby);
module.exports = router;
