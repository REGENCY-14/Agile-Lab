/**
 * Task Manager Module
 * 
 * Handles all task CRUD operations (Create, Read, Update, Delete):
 * - Create new tasks
 * - Retrieve tasks (all or by ID)
 * - Update task status
 * - Delete tasks
 * 
 * Tasks are stored in memory (not persisted to database in this prototype)
 */

const logger = require('./logger');
const { v4: uuidv4 } = require('crypto').randomUUID || (() => Math.random().toString(36).substr(2, 9));

// In-memory task storage
// In production, this would be replaced with a database
let tasks = [];

/**
 * Generate a unique task ID
 * @returns {string} Unique ID
 */
const generateId = () => {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create a new task
 * 
 * User Story: As a user, I can create a task with a title, 
 * so I can track what I need to do.
 * 
 * @param {string} title - Task title
 * @returns {Object} Created task object
 * @throws {Error} If title is invalid
 */
const createTask = (title) => {
  // Validate input
  if (!title || typeof title !== 'string' || title.trim() === '') {
    logger.error('TaskManager', 'Invalid task title provided');
    throw new Error('Task title is required and must be a non-empty string');
  }

  const task = {
    id: generateId(),
    title: title.trim(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(task);
  logger.info('TaskManager', `Task created: ${task.id} - "${task.title}"`);

  return task;
};

/**
 * Get all tasks
 * 
 * User Story: As a user, I can view all tasks in a list with their status.
 * 
 * @returns {Array} Array of all tasks
 */
const getTasks = () => {
  logger.info('TaskManager', `Retrieved ${tasks.length} tasks`);
  return tasks.map(task => ({ ...task })); // Return deep copy to prevent external mutations
};

/**
 * Get a single task by ID
 * @param {string} taskId - Task ID
 * @returns {Object|null} Task object or null if not found
 */
const getTaskById = (taskId) => {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    logger.info('TaskManager', `Retrieved task: ${taskId}`);
  } else {
    logger.warn('TaskManager', `Task not found: ${taskId}`);
  }
  return task || null;
};

/**
 * Update task status
 * 
 * User Story: As a user, I can mark a task as completed, 
 * and it updates in the UI.
 * 
 * @param {string} taskId - Task ID
 * @param {string} status - New status ('pending' or 'completed')
 * @returns {Object} Updated task object
 * @throws {Error} If task not found or invalid status
 */
const updateTaskStatus = (taskId, status) => {
  // Validate status
  const validStatuses = ['pending', 'completed'];
  if (!validStatuses.includes(status)) {
    logger.error('TaskManager', `Invalid status: ${status}`);
    throw new Error(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  // Find and update task
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    logger.error('TaskManager', `Cannot update: task not found - ${taskId}`);
    throw new Error(`Task with ID ${taskId} not found`);
  }

  const previousStatus = task.status;
  task.status = status;
  task.updatedAt = new Date().toISOString();

  logger.info('TaskManager', `Task status updated: ${taskId} - ${previousStatus} → ${status}`);

  return task;
};

/**
 * Delete a task
 * @param {string} taskId - Task ID
 * @returns {Object} Deleted task object
 * @throws {Error} If task not found
 */
const deleteTask = (taskId) => {
  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) {
    logger.error('TaskManager', `Cannot delete: task not found - ${taskId}`);
    throw new Error(`Task with ID ${taskId} not found`);
  }

  const [deletedTask] = tasks.splice(index, 1);
  logger.info('TaskManager', `Task deleted: ${taskId} - "${deletedTask.title}"`);

  return deletedTask;
};

/**
 * Clear all tasks (useful for testing)
 */
const clearTasks = () => {
  tasks = [];
  logger.info('TaskManager', 'All tasks cleared');
};

/**
 * Get task count
 * @returns {number} Number of tasks
 */
const getTaskCount = () => {
  return tasks.length;
};

/**
 * Get completed task count
 * @returns {number} Number of completed tasks
 */
const getCompletedTaskCount = () => {
  return tasks.filter(t => t.status === 'completed').length;
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTaskStatus,
  deleteTask,
  clearTasks,
  getTaskCount,
  getCompletedTaskCount,
};
