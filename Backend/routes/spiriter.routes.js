const express = require("express");
const router = express.Router();
const spiriterController = require("../controllers/spiriter.controller");

router.post("/", spiriterController.chatWithSpiritter);

module.exports = router;
