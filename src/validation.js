/**
 * Input Validation Utilities
 * 
 * Provides reusable validation functions for user input
 * to ensure data integrity and security across the application.
 */

/**
 * Validate if a string is non-empty after trimming
 * @param {*} value - Value to validate
 * @returns {boolean} True if valid non-empty string
 */
const isNonEmptyString = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Validate task title
 * @param {string} title - Task title to validate
 * @returns {Object} { valid: boolean, error: string|null }
 */
const validateTaskTitle = (title) => {
  if (!title) {
    return { valid: false, error: 'Task title is required' };
  }
  
  if (typeof title !== 'string') {
    return { valid: false, error: 'Task title must be a string' };
  }
  
  const trimmed = title.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Task title cannot be empty' };
  }
  
  if (trimmed.length > 200) {
    return { valid: false, error: 'Task title must be 200 characters or less' };
  }
  
  return { valid: true, error: null };
};

/**
 * Validate task status
 * @param {string} status - Status to validate
 * @returns {Object} { valid: boolean, error: string|null }
 */
const validateTaskStatus = (status) => {
  const validStatuses = ['pending', 'completed'];
  
  if (!status) {
    return { valid: false, error: 'Status is required' };
  }
  
  if (!validStatuses.includes(status)) {
    return { 
      valid: false, 
      error: `Status must be one of: ${validStatuses.join(', ')}` 
    };
  }
  
  return { valid: true, error: null };
};

/**
 * Validate task ID format
 * @param {string} id - Task ID to validate
 * @returns {Object} { valid: boolean, error: string|null }
 */
const validateTaskId = (id) => {
  if (!id || typeof id !== 'string') {
    return { valid: false, error: 'Task ID is required and must be a string' };
  }
  
  if (!id.startsWith('task-')) {
    return { valid: false, error: 'Invalid task ID format' };
  }
  
  return { valid: true, error: null };
};

/**
 * Sanitize user input to prevent injection attacks
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove potentially dangerous characters
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .slice(0, 1000); // Limit length
};

module.exports = {
  isNonEmptyString,
  validateTaskTitle,
  validateTaskStatus,
  validateTaskId,
  sanitizeInput,
};
