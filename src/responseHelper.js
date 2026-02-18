/**
 * Response Helper Utilities
 * 
 * Provides standardized response formatting for API endpoints.
 * Ensures consistent response structure across all routes.
 */

const { HTTP_STATUS } = require('./constants');

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 */
const sendSuccess = (res, data, message = 'Success', statusCode = HTTP_STATUS.OK) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Send created response (201)
 * @param {Object} res - Express response object
 * @param {*} data - Created resource data
 * @param {string} message - Success message
 */
const sendCreated = (res, data, message = 'Resource created successfully') => {
  sendSuccess(res, data, message, HTTP_STATUS.CREATED);
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {Object} details - Additional error details
 */
const sendError = (res, message = 'An error occurred', statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, details = null) => {
  const response = {
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
    },
  };
  
  if (details) {
    response.error.details = details;
  }
  
  res.status(statusCode).json(response);
};

/**
 * Send validation error response (422)
 * @param {Object} res - Express response object
 * @param {Object} errors - Validation errors object
 * @param {string} message - Error message
 */
const sendValidationError = (res, errors, message = 'Validation failed') => {
  sendError(res, message, HTTP_STATUS.UNPROCESSABLE_ENTITY, { validationErrors: errors });
};

/**
 * Send not found error response (404)
 * @param {Object} res - Express response object
 * @param {string} resource - Resource name
 */
const sendNotFound = (res, resource = 'Resource') => {
  sendError(res, `${resource} not found`, HTTP_STATUS.NOT_FOUND);
};

/**
 * Send bad request error response (400)
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
const sendBadRequest = (res, message = 'Bad request') => {
  sendError(res, message, HTTP_STATUS.BAD_REQUEST);
};

/**
 * Send paginated response
 * @param {Object} res - Express response object
 * @param {Object} paginatedData - Data with pagination metadata
 * @param {string} message - Success message
 */
const sendPaginated = (res, paginatedData, message = 'Success') => {
  const { tasks, page, pageSize, totalPages, totalItems, hasNextPage, hasPrevPage } = paginatedData;
  
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message,
    data: tasks,
    pagination: {
      page,
      pageSize,
      totalPages,
      totalItems,
      hasNextPage,
      hasPrevPage,
    },
    timestamp: new Date().toISOString(),
  });
};

/**
 * Send no content response (204)
 * @param {Object} res - Express response object
 */
const sendNoContent = (res) => {
  res.status(HTTP_STATUS.NO_CONTENT).send();
};

module.exports = {
  sendSuccess,
  sendCreated,
  sendError,
  sendValidationError,
  sendNotFound,
  sendBadRequest,
  sendPaginated,
  sendNoContent,
};
