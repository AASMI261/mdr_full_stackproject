const express = require("express");
const router = express.Router();
const mdrController = require("../controllers/mdrController");

router.get("/", mdrController.getAllRooms);
router.put("/clean/:id", mdrController.markClean);

module.exports = router;