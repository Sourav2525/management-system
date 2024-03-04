/* eslint-disable snakecasejs/snakecasejs */
const { Sequelize } = require('sequelize');
const { http_status_code } = require("./constants");

/**
 * Handles errors and sends appropriate HTTP responses.
 * 
 * @param {Object} res - The response object.
 * @param {Error} err - The error object to be handled.
 */
function handle_error(res, err) {
  // Log the error for debugging purposes
  // console.error('\nError:', err.name);

  // Default values for error handling
  let error_message = "Internal Server Error";
  let status_code = http_status_code.INTERNAL_SERVER;

  // Handle UniqueConstraintError (HTTP 409 Conflict)
  if (err instanceof Sequelize.UniqueConstraintError) {
    let message = err.fields[0] ? `${err.fields[0]} already exists.` : "Same resource already exists";
    return res.status(http_status_code.CONFLICT).json({ error: message });
  }

  // Handle ValidationError (HTTP 400 Bad Request) and AggregateError (HTTP 400 Bad Request)
  if (err instanceof Sequelize.ValidationError || err instanceof Sequelize.AggregateError) {
    return res.status(http_status_code.BAD_REQUEST).json({ error: "Invalid payload." });
  }

  // Handle EmptyResultError (HTTP 404 Not Found)
  if (err instanceof Sequelize.EmptyResultError) {
    return res.status(http_status_code.NOT_FOUND).json({ error: err.message });
  }

  // Handle DatabaseError (HTTP 400 Bad Request)
  if (err instanceof Sequelize.DatabaseError) {
    if (err.parent.code === "22P02") {
      return res.status(http_status_code.BAD_REQUEST).json({ error: "Provided uuid is invalid." });
    } else if (err.parent.code === "21000") {
      return res.status(http_status_code.CONFLICT).json({ error: "Same resource already exists" });
    }
  }

  // Handle AggregateError (HTTP 400 Bad Request)
  if (err instanceof Sequelize.AggregateError) {
    const errors = err.errors.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    return res.status(http_status_code.BAD_REQUEST).json({ error: "Invalid payload.", errors });
  }

  // Handle custom error (if it is an instance of custom_error class)
  if (err instanceof custom_error) {
    error_message = err.message;
    status_code = err.status_code;
  }

  // Send the appropriate HTTP response
  res.status(status_code).json({
    error: error_message,
  });
}

/**
 * Custom error class extending the Error class.
 */
class custom_error extends Error {
  /**
   * Constructor for the custom_error class.
   * 
   * @param {string} message - The error message.
   * @param {number} status_code - The HTTP status code to be used in the response.
   */
  constructor(message, status_code) {
    super(message);
    this.status_code = status_code;
  }
}

module.exports = {
  handle_error,
  custom_error,
};
