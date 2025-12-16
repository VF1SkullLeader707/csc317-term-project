// db/connection.js (FINAL — SINGLE SOURCE OF TRUTH)

const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// 🔴 MUST MATCH init.js EXACTLY
const dbPath = path.join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ SQLite connection error:", err.message);
  } else {
    console.log("✅ Connected to OrbitCart SQLite database");
  }
});

module.exports = db;
