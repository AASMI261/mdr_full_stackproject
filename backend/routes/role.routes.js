import express from "express";
import pool from "../db.js";
import { getRoles } from "../controllers/role.controller.js";

router.get("/roles", getRoles);
const router = express.Router();

// GET all roles
router.get("/roles", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM roles");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;