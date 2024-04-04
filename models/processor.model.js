const mongoose = require("mongoose");

const ProcessorSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
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
    cores: {
      type: Number,
      required: true,
    },
    threads: {
      type: Number,
      required: true,
    },
    base_clock: {
      type: String,
      required: true,
    },
    boost_clock: {
      type: String,
      required: true,
    },
    cache: {
      type: String,
      required: true,
    },
    tdp: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Processor = mongoose.model("processors", ProcessorSchema);

module.exports = Processor;
