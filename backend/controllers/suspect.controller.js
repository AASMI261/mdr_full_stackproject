const pool = require("../config/db");

// GET ALL SUSPECTS
exports.getAllSuspects = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM suspects ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// SAVE VOICE CONVERSATION
exports.saveConversation = async (req, res) => {
  const { suspect_id, question, answer } = req.body;

  try {
    await pool.query(
      "INSERT INTO voice_conversations (suspect_id, question, answer) VALUES ($1, $2, $3)",
      [suspect_id, question, answer]
    );

    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET CONVERSATION BY SUSPECT
exports.getConversation = async (req, res) => {
  const { suspectId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM voice_conversations WHERE suspect_id=$1 ORDER BY created_at",
      [suspectId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};