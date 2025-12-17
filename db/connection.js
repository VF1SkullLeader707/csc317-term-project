// db/connection.js — FINAL, RENDER-SAFE

const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "database.sqlite");
const schemaSQL = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
const ordersSQL = fs.readFileSync(path.join(__dirname, "orders.sql"), "utf8");
const seedSQL   = fs.readFileSync(path.join(__dirname, "seed.sql"), "utf8");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ SQLite connection error:", err.message);
    return;
  }

  console.log("✅ Connected to OrbitCart SQLite database");

  db.exec(schemaSQL, (schemaErr) => {
    if (schemaErr) {
      console.error("❌ schema.sql error:", schemaErr.message);
      return;
    }
    console.log("✅ schema.sql applied");

    db.exec(ordersSQL, (ordersErr) => {
      if (ordersErr) {
        console.error("❌ orders.sql error:", ordersErr.message);
        return;
      }
      console.log("✅ orders.sql applied");

      db.exec(seedSQL, (seedErr) => {
        if (seedErr) {
          console.error("❌ seed.sql error:", seedErr.message);
          return;
        }
        console.log("✅ seed.sql applied");
      });
    });
  });
});

module.exports = db;
