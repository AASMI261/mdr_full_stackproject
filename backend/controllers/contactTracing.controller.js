const pool = require("../config/db");

exports.getAllContacts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        patient_id AS id,
        patient_name AS name,
        mdr_type AS mdr,
        checkin_date AS "checkInDate",
        checkin_time AS "checkInTime",
        contact_date AS date,
        contact_time AS time,
        suspect_id AS "suspectId",
        suspect_name AS "suspectName",
        location,
        checkout_date AS "checkoutDate",
        checkout_time AS "checkoutTime"
      FROM contact_tracing
      ORDER BY contact_date DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};