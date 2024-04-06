const express = require("express");
const router = express.Router();
const Processor = require("../models/processor.model");
const GraphicsCard = require("../models/graphicsCard.model")
const Motherboard = require("../models/motherboard.model")
const RAM = require("../models/ram.model")
const Storage = require("../models/storage.model")
const SMPS = require("../models/smps.model")
const Cabinets = require("../models/cabinet.model")

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//GPU

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
    res.status(500).json({ message: "There was an error processing your request." });
  }
});

router.get("/GPU", async (req, res) => {
  try {
    const graphicCard = await GraphicsCard.find();
    res.json(graphicCard);
  } catch (err) {
    console.log("Error occurred while fetching GPU data:", err);
    res.status(500).json({ message: "There was an error processing your request." });
  }
});

//CPU

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
    res.status(500).json({ message: "There was an error processing your request." });
  }
});

router.get("/CPU", async (req, res) => {
  try {
    const processor = await Processor.find();
    res.json(processor);
  } catch (err) {
    console.error("Error occurred while fetching CPU data:", err);
    res.status(500).json({ message: "There was an error processing your request." });
  }
});

// Cabinets

router.get("/cabinet/:id", async (req, res) => {
  try{
    const cabinetId = req.params.id;
    const cabinet = await Cabinets.findById(cabinetId)

    if (!cabinet){
      return res.status(404).json({message:"Cabinet Not Found!"})
    }

    res.json(cabinet);
  } catch (err) {
    console.log("Error fetching the cabinet: ", err);
    res.status(500).json({ message: "There was an error processing your request"})
  }
})

router.get("/cabinet", async (req, res) => {
  try{
    const cabinet = await Cabinets.find();
    res.json(cabinet);
  } catch (err) {
    console.error("Error occurred while getting cabinet info:", err);
    res.status(500).json({ message: "There was an error processing your request." })
  }
})

// Storage

router.get("/storage/:id", async (req, res) => {
  console.log(Storage.findById(req.params.id));
  try {
    const storage = await Storage.findById(req.params.id);
    

    if (!storage) {
      return res.status(404).json( { message: 'Storage not found.'} );
    }
  
    res.json(storage);
  } catch (err) {
    console.log("Error occured while getting the storage device details", err)
    res.status(500).json({ message: "Server Error" });
  }
})

router.get("/storage", async (req, res) => {
  try{
    const storage = await Storage.find();
    res.json(storage);
  } catch (err) {
    console.error("Error occurred in retrieving storage device data.", err);
    res.status(500).json({message:"There was an error processing your request."})
  }
})

// SMPS

router.get("/smps/:id", async (req, res) => {
  try{
    const smps = await SMPS.findById(req.params.id);

    if (!smps){
      return res.status(404).json({ message: "SMPS device data not found"});
    }

    res.json(smps);
  } catch (err) {
    console.error("Error occured in retrieving storage device data.", err);
    res.status(500).json({ message: "There was an error processing your request." })
  }
})

router.get("/smps", async (req, res) => {
  try{
    const smps = await SMPS.find();
    res.json(smps);
  } catch (err) {
    console.error("Error occured in retrieving SMPS device data")
    res.status(500).json({ message:"There was an error processing your request"})
  }
})

// Motherboard

router.get("/motherboard/:id", async (req, res) => {
  try{
    const motherboard = await Motherboard.findById(req.params.id);

    if (!motherboard) {
      return res.status(404).json({ message: "Motherboard data not found." });
    }

    res.json(motherboard);
  } catch (err) {
    console.error("Error occurred while getting motherboard data.", err);
    res.status(500).json({ message: "There was an error processing your request"})
  }
})

router.get("/motherboard", async (req, res) => {
  try{
    const motherboard = await Motherboard.find();
    res.json(motherboard);
  } catch (err) {
    console.error("Error occured in retrieving MotherBoard devices data")
    res.status(500).json({ message: "There was an error processing your request"})
  }
})

// RAM

router.get("/ram/:id", async (req, res) => {
  try{
    const ram = await RAM.findById(req.params.id);
    
    if (!ram){
      return res.status(404).json({ message: "RAM data was not found"})
    }

    res.json(ram);
  } catch (err) {
    console.error("Error occured in retrieving RAM device data");
    res.status(500).json({message: "There was an error processing your request"});
  }
})

router.get("/ram", async (req, res) => {
  try{
    const ram = await RAM.find();
    res.json(ram);
  } catch (err) {
    console.error("Error occured in retrieving RAM device data");
    res.status(500).json({ message: "There was an erro processing your request"})
  }
})

module.exports = router;
