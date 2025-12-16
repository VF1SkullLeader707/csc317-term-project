const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// GET /api/products  → all products
router.get("/", (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ error: "DB error" });
        }
        res.json(rows);
    });
});

// GET /api/products/:id  → single product
router.get("/:id", (req, res) => {
    db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            console.error("Error fetching product:", err);
            return res.status(500).json({ error: "DB error" });
        }
        if (!row) return res.status(404).json({ error: "Not found" });
        res.json(row);
    });
});

module.exports = router;
