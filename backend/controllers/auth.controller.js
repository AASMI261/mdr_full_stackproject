const pool = require("../config/db");
const bcrypt = require("bcrypt");

// REGISTER USER
exports.registerUser = async (req, res) => {
  const { name, mobile, email, password } = req.body;

  try {
    // check if user already exists
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, mobile, email, password) VALUES ($1, $2, $3, $4)",
      [name, mobile, email, hashedPassword]
    );

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};