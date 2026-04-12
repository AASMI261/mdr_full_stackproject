const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const getAllPatients = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM patientdetails ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const addPatient = async (req, res) => {
  const { name, ward } = req.body; // abhi simple rakha hai

  try {
    const result = await pool.query(
      "INSERT INTO patientdetails (name, ward) VALUES ($1,$2) RETURNING *",
      [name, ward]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Insert Error");
  }
};

module.exports = {
  getAllPatients,
  addPatient
};