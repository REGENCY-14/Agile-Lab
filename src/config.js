/**
 * Application Configuration Module
 * 
 * Centralizes all configuration settings for the application.
 * Uses environment variables with sensible defaults.
 */

module.exports = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development',
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    logToFile: process.env.LOG_TO_FILE !== 'false',
    logDir: process.env.LOG_DIR || 'logs',
  },

  // Application settings
  app: {
    name: 'Agile Lab Task Tracker',
    version: '1.0.0',
    maxTasksPerUser: parseInt(process.env.MAX_TASKS_PER_USER || '1000', 10),
  },

  // Feature flags
  features: {
    enableHealthCheck: process.env.ENABLE_HEALTH_CHECK !== 'false',
    enableDebugMode: process.env.DEBUG_MODE === 'true',
  },
};
