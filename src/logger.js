/**
 * Logger Module
 * 
 * Handles all application logging with support for different log levels:
 * - DEBUG: Detailed information for debugging (only in development)
 * - INFO: General information messages
 * - WARN: Warning messages
 * - ERROR: Error messages
 * 
 * Format: [TIMESTAMP] [LEVEL] [CONTEXT] Message
 */

const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFilePath = path.join(logsDir, 'app.log');

/**
 * Get current timestamp in ISO format
 * @returns {string} Formatted timestamp
 */
const getTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Format log message with timestamp, level, and context
 * @param {string} level - Log level (INFO, WARN, ERROR)
 * @param {string} context - Context/category of the log
 * @param {string} message - The log message
 * @returns {string} Formatted log message
 */
const formatLog = (level, context, message) => {
  return `[${getTimestamp()}] [${level}] [${context}] ${message}`;
};

/**
 * Write log to file
 * @param {string} logMessage - The formatted log message
 */
const writeToFile = (logMessage) => {
  try {
    fs.appendFileSync(logFilePath, logMessage + '\n');
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }
};

/**
 * Log debug level messages (only in development)
 * @param {string} context - Context/category
 * @param {string} message - Message to log
 */
const debug = (context, message) => {
  if (process.env.NODE_ENV !== 'production') {
    const logMessage = formatLog('DEBUG', context, message);
    console.debug(logMessage);
    writeToFile(logMessage);
  }
};

/**
 * Log info level messages
 * @param {string} context - Context/category (e.g., "TaskManager", "Server")
 * @param {string} message - Message to log
 */
const info = (context, message) => {
  const logMessage = formatLog('INFO', context, message);
  console.log(logMessage);
  writeToFile(logMessage);
};

/**
 * Log warning level messages
 * @param {string} context - Context/category
 * @param {string} message - Message to log
 */
const warn = (context, message) => {
  const logMessage = formatLog('WARN', context, message);
  console.warn(logMessage);
  writeToFile(logMessage);
};

/**
 * Log error level messages
 * @param {string} context - Context/category
 * @param {string} message - Message to log
 * @param {Error} [error] - Optional error object
 */
const error = (context, message, error) => {
  const errorDetails = error ? ` | ${error.message}` : '';
  const logMessage = formatLog('ERROR', context, message + errorDetails);
  console.error(logMessage);
  writeToFile(logMessage);
};

module.exports = {
  debug,
  info,
  warn,
  error,
  getTimestamp,
};
