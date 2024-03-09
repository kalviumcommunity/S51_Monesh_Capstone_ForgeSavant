const express = require('express');
const app = express();
require("dotenv").config()
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Welcome to ForgeSavant API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
