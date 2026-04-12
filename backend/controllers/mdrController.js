const pool = require("../db");

// GET ALL ROOMS
exports.getAllRooms = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM mdr_rooms ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// MARK ROOM CLEAN
exports.markClean = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "UPDATE mdr_rooms SET contaminated = false, cleaned_date = CURRENT_DATE WHERE id = $1",
      [id]
    );

    res.json({ message: "Room marked clean" });
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Server Error" });
  }
};