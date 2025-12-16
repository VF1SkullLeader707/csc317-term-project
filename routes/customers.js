// routes/customers.js (RENDER-SAFE FINAL VERSION)

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const db = require("../db/connection");

// -----------------------------
// POST /api/customers/register
// -----------------------------
router.post("/register", (req, res) => {
  const fullName = String(req.body.fullName || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO customers (full_name, email, password_hash, role)
    VALUES (?, ?, ?, 'user')
  `;

  db.run(sql, [fullName, email, passwordHash], function (err) {
    if (err) {
      if (String(err.message || "").includes("UNIQUE")) {
        return res.status(409).json({ error: "Email already registered." });
      }
      console.error("Register error:", err);
      return res.status(500).json({ error: "Server error." });
    }

    // Create session (logged in)
    req.session.user = {
      id: this.lastID,
      fullName,
      email,
      role: "user",
    };

    return res.json({ ok: true, user: req.session.user });
  });
});

// -----------------------------
// POST /api/customers/login
// -----------------------------
router.post("/login", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required." });
  }

  db.get(
    `
    SELECT id, full_name, email, password_hash, role
    FROM customers
    WHERE email = ?
    `,
    [email],
    (err, user) => {
      if (err) {
        console.error("Login DB error:", err);
        return res.status(500).json({ error: "Server error." });
      }

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const ok = bcrypt.compareSync(password, user.password_hash);
      if (!ok) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      // Create session
      req.session.user = {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role || "user",
      };

      return res.json({ ok: true, user: req.session.user });
    }
  );
});

// -----------------------------
// GET /api/customers/me
// -----------------------------
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ user: null });
  }
  res.json({ user: req.session.user });
});

// -----------------------------
// POST /api/customers/logout
// -----------------------------
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

module.exports = router;
