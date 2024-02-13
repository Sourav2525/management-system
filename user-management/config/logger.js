/* eslint-disable snakecasejs/snakecasejs */
const winston = require("winston");

// Define the logger configuration
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ filename: "error.log" }) // Log to a file
  ]
});

module.exports = {
    logger
};