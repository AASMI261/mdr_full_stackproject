const express = require("express");
const router = express.Router();
const controller = require("../controllers/suspect.controller");

router.get("/", controller.getAllSuspects);
router.post("/conversation", controller.saveConversation);
router.get("/conversation/:suspectId", controller.getConversation);

module.exports = router;