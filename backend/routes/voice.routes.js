const express = require("express");
const router = express.Router();
const { speechToText } = require("../controllers/voice.controller");

router.post("/answer", speechToText);

module.exports = router;
