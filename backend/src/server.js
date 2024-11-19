const http = require('http');
const app = require('./app'); // Import the app from app.js
require('dotenv').config();

// Set the port from .env or default
const PORT = process.env.PORT || 5000;

// Create an HTTP server and start listening
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
