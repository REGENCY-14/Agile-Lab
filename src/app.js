/**
 * Express Application Routes and Middleware
 * 
 * Configures:
 * - Task API endpoints (create, read, update, delete)
 * - Health check endpoint
 * - Static file serving for frontend
 * - Error handling middleware
 */

const express = require('express');
const path = require('path');
const taskManager = require('./taskManager');
const health = require('./health');
const logger = require('./logger');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files

// Request logging middleware
app.use((req, res, next) => {
  logger.info('Server', `${req.method} ${req.path}`);
  next();
});

/**
 * API Routes - Task Management
 */

/**
 * POST /api/tasks
 * Create a new task
 * 
 * Request body: { "title": "Task title" }
 * Response: { "id": "...", "title": "...", "status": "pending", "createdAt": "..." }
 */
app.post('/api/tasks', (req, res) => {
  try {
    const { title } = req.body;
    const task = taskManager.createTask(title);
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    logger.error('Server', 'Failed to create task', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * GET /api/tasks
 * Retrieve all tasks
 * 
 * Response: [ { "id": "...", "title": "...", "status": "...", "createdAt": "..." } ]
 */
app.get('/api/tasks', (req, res) => {
  try {
    const tasks = taskManager.getTasks();
    
    res.json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    logger.error('Server', 'Failed to retrieve tasks', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve tasks',
    });
  }
});

/**
 * GET /api/tasks/:id
 * Retrieve a single task by ID
 */
app.get('/api/tasks/:id', (req, res) => {
  try {
    const task = taskManager.getTaskById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with ID ${req.params.id} not found`,
      });
    }

    res.json({
      success: true,
      message: 'Task retrieved successfully',
      data: task,
    });
  } catch (error) {
    logger.error('Server', 'Failed to retrieve task', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve task',
    });
  }
});

/**
 * PUT /api/tasks/:id
 * Update task status
 * 
 * Request body: { "status": "completed" }
 * Response: Updated task object
 */
app.put('/api/tasks/:id', (req, res) => {
  try {
    const { status } = req.body;
    const task = taskManager.updateTaskStatus(req.params.id, status);
    
    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    logger.error('Server', 'Failed to update task', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const task = taskManager.deleteTask(req.params.id);
    
    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: task,
    });
  } catch (error) {
    logger.error('Server', 'Failed to delete task', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * GET /api/stats
 * Get task statistics
 */
app.get('/api/stats', (req, res) => {
  try {
    const totalTasks = taskManager.getTaskCount();
    const completedTasks = taskManager.getCompletedTaskCount();
    const pendingTasks = totalTasks - completedTasks;

    res.json({
      success: true,
      message: 'Statistics retrieved successfully',
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      },
    });
  } catch (error) {
    logger.error('Server', 'Failed to retrieve statistics', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve statistics',
    });
  }
});

/**
 * GET /health
 * Application health check endpoint
 * 
 * Technical Requirement: Add a health endpoint (/health) returning status and uptime.
 * 
 * Response:
 * {
 *   "status": "healthy",
 *   "uptime": 3600,
 *   "timestamp": "2024-01-15T10:30:00Z"
 * }
 */
app.get('/health', (req, res) => {
  try {
    const healthStatus = health.getHealthStatus();
    res.json(healthStatus);
  } catch (error) {
    logger.error('Server', 'Health check failed', error);
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
    });
  }
});

/**
 * GET / or index
 * Serve the frontend HTML
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

/**
 * 404 Not Found Handler
 */
app.use((req, res) => {
  logger.warn('Server', `404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.path} not found`,
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  logger.error('Server', 'Unhandled error', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

module.exports = app;
