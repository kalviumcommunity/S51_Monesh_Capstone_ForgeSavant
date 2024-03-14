const mongoose = require('mongoose');
require('dotenv').config()

const startDB = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log('🚀 Database initiated: Connection successful!');
  } catch (err) {
    console.error('🛑 Oh no! Database connection failed:', err.message);
  }
};

const isConnected = () => {
    return mongoose.connection.readyState === 1 ? true : false;
}

module.exports = {startDB, isConnected};