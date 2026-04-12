const express = require("express");
const router = express.Router();
const {
  getAllPatients,
  addPatient
} = require("../controllers/patient.controller");

router.get("/", getAllPatients);
router.post("/", addPatient);

module.exports = router;