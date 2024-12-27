const express = require("express");
const router = express.Router();

// Dummy GET endpoint
router.get("/", (req, res) => {
  res.send("Drugs API works!");
});

module.exports = router;
