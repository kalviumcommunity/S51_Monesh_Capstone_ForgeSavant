const express = require("express");
const router = express.Router();
const Processor = require("../models/processor.model");
const GraphicsCard = require("../models/graphicsCard.model")
const Motherboard = require("../models/motherboard.model")
const Ram = require("../models/ram.model")
const Storage = require("../models/storage.model")
const smps = require("../models/smps.model")
const cabinets = require("../models/cabinet.model")

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

router.get("/GPU/:id", async (req, res) => {
  try {
    const gpuId = req.params.id;
    const graphicCard = await GraphicsCard.findById(gpuId);

    if (!graphicCard) {
      return res.status(404).json({ message: "Graphic Card not found" });
    }

    res.json(graphicCard);
  } catch (err) {
    console.log("Error while fetching the GPU:", err);
    res.status(500).json({ message: "Error occurred while fetching the Graphics Card" });
  }
});

router.get("/GPU", async (req, res) => {
  try {
    const graphicCard = await GraphicsCard.find();
    res.json(graphicCard);
  } catch (err) {
    console.log("Error occurred while fetching GPU data:", err);
    res.status(500).json({ message: "Error occurred while fetching GPU data" });
  }
});

router.get("/CPU/:id", async (req, res) => {
  try {
    const cpuID = req.params.id;
    const processor = await Processor.findById(cpuID);

    if (!processor) {
      return res.status(404).json({ message: "Processor not found" });
    }

    res.json(processor);
  } catch (err) {
    console.error("Error fetching the processor:", err);
    res.status(500).json({ message: "Error occurred while fetching the processor" });
  }
});

router.get("/CPU", async (req, res) => {
  try {
    const processor = await Processor.find();
    res.json(processor);
  } catch (err) {
    console.error("Error occurred while fetching CPU data:", err);
    res.status(500).json({ message: "Error occurred while fetching CPU data" });
  }
});

module.exports = router;
