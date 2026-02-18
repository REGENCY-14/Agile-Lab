/**
 * Middleware Utilities
 * 
 * Provides Express middleware functions for common cross-cutting concerns
 * such as request logging, error handling, and input validation.
 */

const logger = require('./logger');

/**
 * Request logging middleware
 * Logs all incoming HTTP requests with method, URL, and timestamp
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object  
 * @param {Function} next - Express next middleware function
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, url, ip } = req;
  
  // Log request start
  logger.debug('HTTP', `${method} ${url} from ${ip}`);
  
  // Capture response finish event
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    const logMessage = `${method} ${url} - ${statusCode} - ${duration}ms`;
    
    if (statusCode >= 500) {
      logger.error('HTTP', logMessage);
    } else if (statusCode >= 400) {
      logger.warn('HTTP', logMessage);
    } else {
      logger.info('HTTP', logMessage);
    }
  });
  
  next();
};

/**
 * Error handling middleware
 * Catches and formats errors for consistent error responses
 * 
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  logger.error('ErrorHandler', `${req.method} ${req.url}`, err);
  
  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.url,
    },
  });
};

/**
 * 404 Not Found middleware
 * Handles requests to non-existent routes
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const notFoundHandler = (req, res) => {
  logger.warn('HTTP', `404 Not Found: ${req.method} ${req.url}`);
  
  res.status(404).json({
    error: {
      message: 'Resource not found',
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: req.url,
    },
  });
};

/**
 * Request timeout middleware
 * Sets a timeout for requests to prevent hanging connections
 * 
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Function} Express middleware function
 */
const requestTimeout = (timeout = 30000) => {
  return (req, res, next) => {
    const timer = setTimeout(() => {
      logger.error('HTTP', `Request timeout: ${req.method} ${req.url}`);
      
      if (!res.headersSent) {
        res.status(408).json({
          error: {
            message: 'Request timeout',
            statusCode: 408,
            timestamp: new Date().toISOString(),
          },
        });
      }
    }, timeout);
    
    res.on('finish', () => clearTimeout(timer));
    next();
  };
};

module.exports = {
  requestLogger,
  errorHandler,
  notFoundHandler,
  requestTimeout,
};
