const express = require("express");
const router = express.Router();
const { getAllContacts } = require("../controllers/contactTracing.controller");

router.get("/", getAllContacts);

module.exports = router;