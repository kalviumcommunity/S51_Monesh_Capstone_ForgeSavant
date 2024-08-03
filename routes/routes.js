const express = require("express");
const ObjectId = require("mongodb");
const router = express.Router();
const User = require('../models/user.model');
const { saves, saves2 } = require('../models/saves.model');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


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

//Google Login
router.post('/googleLogin', async (req, res) => {
  const { email, fullname } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new one
      user = new User({ fullname, email, password: null });
      await user.save();
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign the JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.send(fullname);
      }
    );
  } catch (err) {
    console.error('Error during Google login:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Login Route
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign the JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.send(user.fullname);
      }
    );
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Sign-up Route
router.post('/signup', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    console.log(fullname, email);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ fullname, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during sign-up:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//googleUser Check
router.post('/checkGoogleUser', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error('Error checking Google user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Google Signup
router.post('/googleSignup', async (req, res) => {
  const { fullname, email } = req.body;

  try {
    const newUser = new User({ fullname, email, password: null });
    await newUser.save();

    const payload = {
      user: {
        id: newUser.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error('Error during Google sign-up:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//saves
router.post("/saves", async (req, res) => {
  const { cpu, motherboard, gpu, primaryStorage, secondaryStorage, ram, powerSupply, cabinet, email, cinebench, cyberpunk, image } = req.body;
  
  try {
    const newSaves = new saves({ cpu, motherboard, gpu, primaryStorage, secondaryStorage, ram, powerSupply, cabinet, email, cinebench, cyberpunk, image });
    await newSaves.save();
    return res.status(201).json({ message: 'Save successful' });
  } catch (err) {
    console.error('Error during saving details', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//saves2
router.get("/saves2", async (req, res) => {
  try{
    const saves = await saves2.find();
    res.json(saves)
  }catch (err){
    console.error('Error during getting saves', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//saves2 Delete
router.delete("/delsaves/:id", async (req, res) => {
  try{
    const { id } = req.params
    const profile = await saves2.findOneAndDelete({ _id: id });

    if (!profile){
      return res.status(404).json({ error: 'No profile found' });
    }

    res.status(200).json({ message: "Deleted" })
  }catch (err) {
    console.error('Error during deleting profile', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// GPU
router.get("/GPU", async (req, res) => {
  try {
    const graphicCard = await GraphicsCard.find();
    res.json(graphicCard);
  } catch (err) {
    console.error("Error occurred while fetching GPU data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/GPU/:id", async (req, res) => {
  try {
    const gpuId = req.params.id;
    const graphicCard = await GraphicsCard.findById(gpuId);

    if (!graphicCard) {
      return res.status(404).json({ error: "Graphic Card not found" });
    }

    res.json(graphicCard);
  } catch (err) {
    console.error("Error fetching the GPU:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// CPU
router.get("/CPU/:id", async (req, res) => {
  try {
    const cpuID = req.params.id;
    const processor = await Processor.findById(cpuID);

    if (!processor) {
      return res.status(404).json({ error: "Processor not found" });
    }

    res.json(processor);
  } catch (err) {
    console.error("Error fetching the processor:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/CPU", async (req, res) => {
  try {
    const processor = await Processor.find();
    res.json(processor);
  } catch (err) {
    console.error("Error occurred while fetching CPU data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Cabinets
router.get("/cabinet/:id", async (req, res) => {
  try {
    const cabinetId = req.params.id;
    const cabinet = await Cabinets.findById(cabinetId);

    if (!cabinet) {
      return res.status(404).json({ error: "Cabinet Not Found!" });
    }

    res.json(cabinet);
  } catch (err) {
    console.error("Error fetching the cabinet: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/cabinet", async (req, res) => {
  try {
    const cabinet = await Cabinets.find();
    res.json(cabinet);
  } catch (err) {
    console.error("Error occurred while getting cabinet info:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Storage
router.get("/storage/:id", async (req, res) => {
  try {
    const storage = await Storage.findById(req.params.id);

    if (!storage) {
      return res.status(404).json({ error: 'Storage not found.' });
    }

    res.json(storage);
  } catch (err) {
    console.error("Error occurred while getting the storage device details", err)
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/storage", async (req, res) => {
  try {
    const storage = await Storage.find();
    res.json(storage);
  } catch (err) {
    console.error("Error occurred in retrieving storage device data.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// SMPS
router.get("/smps/:id", async (req, res) => {
  try {
    const smps = await SMPS.findById(req.params.id);

    if (!smps) {
      return res.status(404).json({ error: "SMPS device data not found" });
    }

    res.json(smps);
  } catch (err) {
    console.error("Error occurred while getting SMPS device data.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/smps", async (req, res) => {
  try {
    const smps = await SMPS.find();
    res.json(smps);
  } catch (err) {
    console.error("Error occurred in retrieving SMPS device data", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Motherboard
router.get("/motherboard/:id", async (req, res) => {
  try {
    const motherboard = await Motherboard.findById(req.params.id);

    if (!motherboard) {
      return res.status(404).json({ error: "Motherboard data not found" });
    }

    res.json(motherboard);
  } catch (err) {
    console.error("Error occurred while getting motherboard data.", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/motherboard", async (req, res) => {
  try {
    const motherboard = await Motherboard.find();
    res.json(motherboard);
  } catch (err) {
    console.error("Error occurred in retrieving MotherBoard devices data", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// RAM
router.get("/ram/:id", async (req, res) => {
  try {
    const ram = await RAM.findById(req.params.id);

    if (!ram) {
      return res.status(404).json({ error: "RAM data was not found" });
    }

    res.json(ram);
  } catch (err) {
    console.error("Error occurred in retrieving RAM device data", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/ram", async (req, res) => {
  try {
    const ram = await RAM.find();
    res.json(ram);
  } catch (err) {
    console.error("Error occurred in retrieving RAM device data", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
