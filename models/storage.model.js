const mongoose = require('mongoose');

const StorageSchema = new mongoose.Schema({
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
    interface: {
      type: String,
      required: true,
    },
    form_factor: {
      type: String,
      required: true,
    },
    speed: {
      type: String,
      required: true,
    },
    technology: {
      type: String,
      required: true,
    },
    encryption: {
      type: String,
      required: false,
    },
    tbw: {
      type: String,
      required: true,
    },
    warranty: {
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

// Create the Storage model from the schema
const Storage = mongoose.model('storages', StorageSchema);

module.exports = Storage;
