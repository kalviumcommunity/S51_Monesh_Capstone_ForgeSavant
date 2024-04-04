const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config()
const PORT = process.env.PORT || 5000;
const { startDB, isConnected } = require('./db')
const route = require('./routes/routes.js')

app.use('/', route);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);


app.get('/', (req, res) => {
  res.send(isConnected() ? 'Welcome to ForgeSavant API!' : "Server isn't connected to the database yet.");
});

const server = app.listen(PORT, async () => {
  try {
    await startDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error('An error occurred while starting the server:', err);
    process.exit(1);
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('An error occurred while starting the server:', err);
  }
});

