// db/init.js
const fs = require("fs");
const path = require("path");
const db = require("./connection"); // 🔥 USE THE SAME DB INSTANCE

function runSQL(file) {
  return fs.readFileSync(path.join(__dirname, file), "utf8");
}

db.serialize(() => {
  try {
    db.exec(runSQL("schema.sql"), (err) => {
      if (err) {
        console.error("❌ schema.sql error:", err.message);
      } else {
        console.log("✅ schema.sql applied");
      }
    });

    db.exec(runSQL("orders.sql"), (err) => {
      if (err) {
        console.error("❌ orders.sql error:", err.message);
      } else {
        console.log("✅ orders.sql applied");
      }
    });

    db.exec(runSQL("seed.sql"), (err) => {
      if (err) {
        console.error("❌ seed.sql error:", err.message);
      } else {
        console.log("✅ seed.sql applied");
      }
    });

  } catch (e) {
    console.error("❌ DB init failed:", e.message);
  }
});
