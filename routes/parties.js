const express = require("express");
const router = express.Router();
const controller = require("../controller/Cparties");

router.get("/", controller.index);
router.get("/host", controller.hostParty);
module.exports = router;
