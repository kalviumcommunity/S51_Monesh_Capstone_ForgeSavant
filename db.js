const mongoose = require('mongoose');
require('dotenv').config()

const startDB = async () => {
  let retries = 3;
  while (retries) {
    try {
      await mongoose.connect(`${process.env.URI}`);
      console.log('🚀 Database initiated: Connection successful!');
      break;
    } catch (err) {
      console.error(`🛑 Database connection failed: ${err.message}`);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      // Wait for 5 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  if (retries === 0) {
    console.error('❌ Database connection failed after all tries.');
    process.exit(1);
  }
};

const isConnected = () => mongoose.connection.readyState === 1;

module.exports = { startDB, isConnected };
