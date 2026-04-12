const express = require("express");
const router = express.Router();
const { getAllLinkages } = require("../controllers/mdrLinkage.controller");

router.get("/", getAllLinkages);

module.exports = router;