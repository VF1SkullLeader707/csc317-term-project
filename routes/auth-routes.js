const express = require("express");
const router = express.Router();

// temporary placeholder
router.get("/me", (req, res) => {
    res.json({ loggedIn: false });
});

module.exports = router;
