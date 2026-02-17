/**
 * Health Check Module
 * 
 * Provides health status endpoint for monitoring application status and uptime.
 * 
 * Technical Requirement: Add a health endpoint (/health) returning status and uptime.
 */

const logger = require('./logger');

// Track server start time
let startTime = Date.now();

/**
 * Reset start time (useful for testing)
 */
const resetStartTime = () => {
  startTime = Date.now();
};

/**
 * Get application health status
 * 
 * Returns:
 * - status: 'healthy' or 'unhealthy'
 * - uptime: Server uptime in seconds
 * - timestamp: Current time in ISO format
 * - memory: Memory usage information
 * 
 * @returns {Object} Health status object
 */
const getHealthStatus = () => {
  const uptime = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
  const memory = process.memoryUsage();

  const healthStatus = {
    status: 'healthy',
    uptime: uptime,
    timestamp: new Date().toISOString(),
    memory: {
      heapUsed: Math.round(memory.heapUsed / 1024 / 1024), // MB
      heapTotal: Math.round(memory.heapTotal / 1024 / 1024), // MB
      rss: Math.round(memory.rss / 1024 / 1024), // MB
    },
  };

  logger.info('HealthCheck', `Health status requested - Status: ${healthStatus.status}, Uptime: ${uptime}s`);

  return healthStatus;
};

/**
 * Get uptime in seconds
 * @returns {number} Uptime in seconds
 */
const getUptime = () => {
  return Math.floor((Date.now() - startTime) / 1000);
};

module.exports = {
  getHealthStatus,
  getUptime,
  resetStartTime,
};
