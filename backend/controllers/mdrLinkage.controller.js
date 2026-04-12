const pool = require("../config/db");

exports.getAllLinkages = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        mdr_id,
        p1_id AS p1,
        p1_name AS p1name,
        p2_id AS p2,
        p2_name AS p2name,
        location,
        timestamp
      FROM mdr_linkage
      ORDER BY timestamp DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};