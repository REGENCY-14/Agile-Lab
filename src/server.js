/**
 * Server Entry Point
 * 
 * Starts the Express server on port 3000
 * Handles graceful shutdown
 */

const app = require('./app');
const logger = require('./logger');

const PORT = process.env.PORT || 3000;

/**
 * Start the server
 */
const server = app.listen(PORT, () => {
  logger.info('Server', `Task Tracker server started on http://localhost:${PORT}`);
  logger.info('Server', 'Press Ctrl+C to stop the server');
});

/**
 * Handle graceful shutdown
 */
const gracefulShutdown = (signal) => {
  logger.info('Server', `Received ${signal}, shutting down gracefully...`);

  server.close(() => {
    logger.info('Server', 'Server closed');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Server', 'Forced shutdown due to timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', (error) => {
  logger.error('Server', 'Uncaught exception', error);
  process.exit(1);
});

/**
 * Handle unhandled promise rejections
 */
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Server', `Unhandled Rejection at ${promise}: ${reason}`);
});

module.exports = server;
