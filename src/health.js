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
 * Format uptime into human-readable string
 * @param {number} seconds - Uptime in seconds
 * @returns {string} Formatted uptime string
 */
const formatUptime = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);
  
  return parts.join(' ');
};

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
 * - environment: Node.js environment details
 * - system: System information
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
      external: Math.round(memory.external / 1024 / 1024), // MB
    },
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      pid: process.pid,
    },
    system: {
      uptimeSeconds: uptime,
      uptimeFormatted: formatUptime(uptime),
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
