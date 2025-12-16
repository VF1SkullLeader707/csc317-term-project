const express = require("express");
const router = express.Router();

// temporary placeholder
router.post("/checkout", (req, res) => {
    res.json({ total: 0, discountApplied: false });
});

module.exports = router;
