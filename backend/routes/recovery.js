const express = require("express");
const router = express.Router();
const recoveryController = require("../controllers/recoveryController");

router.get("/patients", recoveryController.getAllPatients);

module.exports = router;