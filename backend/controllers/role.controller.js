import pool from "../db.js";

export const getRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM roles");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};