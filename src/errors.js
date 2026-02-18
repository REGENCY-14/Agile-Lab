/**
 * Custom Error Classes
 * 
 * Provides specialized error classes for different error scenarios.
 * Enables better error handling and more informative error messages.
 */

const { HTTP_STATUS } = require('./constants');

/**
 * Base Application Error
 * Custom error class that all other errors extend
 */
class ApplicationError extends Error {
  constructor(message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();
    
    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Convert error to JSON format
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      ...(this.details && { details: this.details }),
    };
  }
}

/**
 * Validation Error - 422 Unprocessable Entity
 * Used when input validation fails
 */
class ValidationError extends ApplicationError {
  constructor(message, validationErrors = null) {
    super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, validationErrors);
  }
}

/**
 * Not Found Error - 404
 * Used when a requested resource doesn't exist
 */
class NotFoundError extends ApplicationError {
  constructor(resource = 'Resource', identifier = null) {
    const message = identifier 
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, HTTP_STATUS.NOT_FOUND);
    this.resource = resource;
    this.identifier = identifier;
  }
}

/**
 * Bad Request Error - 400
 * Used when client sends malformed or invalid request
 */
class BadRequestError extends ApplicationError {
  constructor(message = 'Bad request') {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

/**
 * Conflict Error - 409
 * Used when request conflicts with current state (e.g., duplicate resource)
 */
class ConflictError extends ApplicationError {
  constructor(message = 'Resource already exists') {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

/**
 * Unauthorized Error - 401
 * Used when authentication is required but not provided
 */
class UnauthorizedError extends ApplicationError {
  constructor(message = 'Authentication required') {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

/**
 * Forbidden Error - 403
 * Used when user is authenticated but doesn't have permission
 */
class ForbiddenError extends ApplicationError {
  constructor(message = 'Access denied') {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

/**
 * Service Unavailable Error - 503
 * Used when service is temporarily unavailable
 */
class ServiceUnavailableError extends ApplicationError {
  constructor(message = 'Service temporarily unavailable') {
    super(message, HTTP_STATUS.SERVICE_UNAVAILABLE);
  }
}

/**
 * Database Error - 500
 * Used for database-related errors
 */
class DatabaseError extends ApplicationError {
  constructor(message = 'Database operation failed', originalError = null) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      originalError: originalError?.message,
    });
  }
}

/**
 * Check if error is an application error
 * @param {Error} error - Error to check
 * @returns {boolean} True if ApplicationError instance
 */
const isApplicationError = (error) => {
  return error instanceof ApplicationError;
};

/**
 * Format error for logging
 * @param {Error} error - Error to format
 * @returns {Object} Formatted error object
 */
const formatErrorForLogging = (error) => {
  if (isApplicationError(error)) {
    return {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      timestamp: error.timestamp,
      stack: error.stack,
      ...(error.details && { details: error.details }),
    };
  }
  
  return {
    name: error.name || 'Error',
    message: error.message || 'Unknown error',
    stack: error.stack,
  };
};

module.exports = {
  ApplicationError,
  ValidationError,
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
  ServiceUnavailableError,
  DatabaseError,
  isApplicationError,
  formatErrorForLogging,
};
