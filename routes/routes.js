const express = require("express");
const router = express.Router(); // Use 'Router' with a capital 'R'
const AmdProcessor = require("../models/amdProcessor.model");

router.get("/amd", async (req, res) => {
  try {
    const amdprocessor = await AmdProcessor.find();
    res.json(amdprocessor);
  } catch (err) {
    res.status(500).json({ message: "Error occurred while fetching data" });
  }
});

module.exports = router;
