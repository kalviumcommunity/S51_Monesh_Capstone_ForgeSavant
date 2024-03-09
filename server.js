const express = require('express');
const app = express();
require("dotenv").config()
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Welcome to ForgeSavant API!');
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('An error occurred while starting the server:', err);
  }
});
