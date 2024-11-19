const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(xssClean());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api', require('./routes')); // Example route setup

// Error Handler (Optional)
const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
