require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { Pool } = require("pg");
const voiceRoutes = require("./routes/voice.routes.js");
const patientRoutes = require("./routes/patient.routes");
const recoveryRoute = require("./routes/recovery");
const mdrRoutes = require("./routes/mdrRoutes");
const mdrLinkageRoutes = require("./routes/mdrLinkage.routes");
const contactTracingRoutes = require("./routes/contactTracing.routes");
const suspectRoutes = require("./routes/suspect.routes");
const authRoutes = require("./routes/auth.routes");
const passwordRoutes = require("./routes/password.routes");

const app = express();
// ================= DATABASE CONNECTION =================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Azure Voice Bot Backend Running");
});

app.use("/voice", voiceRoutes);
app.use("/patientdetails", patientRoutes);
app.use("/api/recovery", recoveryRoute);
app.use("/api/mdr", mdrRoutes);
app.use("/api/mdr-linkage", mdrLinkageRoutes);
app.use("/api/contact-tracing", contactTracingRoutes);
app.use("/api/suspects", suspectRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/password", passwordRoutes);
// ================= GET ALL PATIENTS =================
app.get("/patients", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM patients ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ================= ADD PATIENT =================
app.post("/patients", async (req, res) => {
  const { name, ward, status, mdr, admit } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO patients (name, ward, status, mdr, admit) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, ward, status, mdr, admit]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Insert Error");
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
