/**
 * Application Constants
 * 
 * Centralized storage for all application-wide constants including
 * magic numbers, status codes, time intervals, and configuration values.
 * 
 * Benefits:
 * - Eliminates magic numbers scattered throughout code
 * - Makes constants easily discoverable and maintainable
 * - Provides single source of truth for values
 * - Enables IDE autocomplete for constant names
 */

/**
 * HTTP Status Codes
 */
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * Task Status Values
 */
const TASK_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
};

/**
 * Valid Task Statuses Array
 */
const VALID_TASK_STATUSES = Object.values(TASK_STATUS);

/**
 * Log Levels
 */
const LOG_LEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

/**
 * Time Constants (in milliseconds)
 */
const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
};

/**
 * Application Limits
 */
const LIMITS = {
  MAX_TASK_TITLE_LENGTH: 200,
  MIN_TASK_TITLE_LENGTH: 1,
  MAX_INPUT_LENGTH: 1000,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  MAX_TASKS_PER_USER: 1000,
};

/**
 * Default Configuration Values
 */
const DEFAULTS = {
  PORT: 3000,
  HOST: 'localhost',
  LOG_LEVEL: 'info',
  NODE_ENV: 'development',
  REQUEST_TIMEOUT: 30000, // 30 seconds
};

/**
 * API Response Messages
 */
const MESSAGES = {
  TASK_CREATED: 'Task created successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  TASK_NOT_FOUND: 'Task not found',
  INVALID_TASK_TITLE: 'Task title is required and must be a non-empty string',
  INVALID_TASK_STATUS: 'Invalid task status',
  INVALID_TASK_ID: 'Invalid task ID',
  SERVER_ERROR: 'Internal server error',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation error',
};

/**
 * Regular Expressions
 */
const REGEX = {
  TASK_ID: /^task-\d+-[a-z0-9]+$/,
  ISO_DATE: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
};

/**
 * Environment Types
 */
const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
};

/**
 * Memory Constants (in bytes)
 */
const MEMORY = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
};

module.exports = {
  HTTP_STATUS,
  TASK_STATUS,
  VALID_TASK_STATUSES,
  LOG_LEVEL,
  TIME,
  LIMITS,
  DEFAULTS,
  MESSAGES,
  REGEX,
  ENVIRONMENT,
  MEMORY,
};
