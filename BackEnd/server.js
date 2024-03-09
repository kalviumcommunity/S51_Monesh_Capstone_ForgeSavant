const express = require('express');
const app = express();
require("dotenv").config()
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Welcome to ForgeSavant API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
