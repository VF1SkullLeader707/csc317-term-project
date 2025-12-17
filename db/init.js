// db/init.js
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Path to SQLite DB
const dbPath = path.join(__dirname, "database.sqlite");

// Load SQL files
const schemaSQL = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
const seedSQL   = fs.readFileSync(path.join(__dirname, "seed.sql"), "utf8");
const ordersSQL = fs.readFileSync(path.join(__dirname, "orders.sql"), "utf8");

// Open DB
const db = new sqlite3.Database(dbPath);

db.exec(schemaSQL, (err) => {
  if (err) {
    console.error("❌ Error applying schema.sql:", err.message);
    process.exit(1);
  }
  console.log("✅ schema.sql applied");

  db.exec(ordersSQL, (err2) => {
    if (err2) {
      console.error("❌ Error applying orders.sql:", err2.message);
     if (err) {
  console.error("❌ Error applying schema.sql:", err.message);
  return;
}

    }
    console.log("✅ orders.sql applied");

    db.exec(seedSQL, (err3) => {
      if (err3) {
        console.error("❌ Error applying seed.sql:", err3.message);
        process.exit(1);
      }
      console.log("✅ seed.sql applied");

      db.close(() => {
        console.log("✅ Database initialized at db/database.sqlite");
      });
    });
  });
});
