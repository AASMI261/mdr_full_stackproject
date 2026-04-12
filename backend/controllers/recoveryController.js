const pool = require("../db");

// GET ALL PATIENTS
exports.getAllPatients = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM recovery ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recovery data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};