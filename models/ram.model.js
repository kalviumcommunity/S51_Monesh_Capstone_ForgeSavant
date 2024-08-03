const mongoose = require('mongoose');

const RamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  specifications: {
    capacity: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    speed: {
      type: String,
      required: true,
    },
    cas_latency: {
      type: Number,
      required: true,
    },
    voltage: {
      type: String,
      required: true,
    },
    rgb: {
      type: Boolean,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
});


const Ram = mongoose.model('rams', RamSchema);

module.exports = Ram;
