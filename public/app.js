/**
 * Frontend Application JavaScript
 * 
 * Handles:
 * - Task creation
 * - Task display/rendering
 * - Task completion
 * - Task deletion
 * - Statistics updates
 * - API communication
 */

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksContainer = document.getElementById('tasksContainer');
const inputError = document.getElementById('inputError');
const taskTemplate = document.getElementById('taskTemplate');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const completionRateEl = document.getElementById('completionRate');

// API Base URL
const API_BASE = 'http://localhost:3000/api';

/**
 * Display error message
 * @param {string} message - Error message
 */
const showError = (message) => {
  inputError.textContent = message;
  inputError.classList.add('visible');
  setTimeout(() => {
    inputError.classList.remove('visible');
  }, 4000);
};

/**
 * Clear error message
 */
const clearError = () => {
  inputError.textContent = '';
  inputError.classList.remove('visible');
};

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Create a task via API
 * 
 * User Story: As a user, I can create a task with a title, 
 * so I can track what I need to do.
 */
const createTask = async () => {
  const title = taskInput.value.trim();

  // Validate input
  if (!title) {
    showError('Please enter a task title');
    return;
  }

  try {
    clearError();
    addBtn.disabled = true;
    addBtn.textContent = '⏳ Adding...';

    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create task');
    }

    // Clear input and reload
    taskInput.value = '';
    taskInput.focus();
    
    // Reload tasks and stats
    await loadTasks();
    await loadStats();

    console.log('✅ Task created:', result.data);
  } catch (error) {
    showError(`Error: ${error.message}`);
    console.error('Create task error:', error);
  } finally {
    addBtn.disabled = false;
    addBtn.innerHTML = '<span class="btn-icon">➕</span> Add Task';
  }
};

/**
 * Load all tasks from API and display them
 * 
 * User Story: As a user, I can view all tasks in a list with their status.
 */
const loadTasks = async () => {
  try {
    const response = await fetch(`${API_BASE}/tasks`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to load tasks');
    }

    const tasks = result.data;

    // Clear container
    tasksContainer.innerHTML = '';

    if (tasks.length === 0) {
      tasksContainer.innerHTML = '<p class="empty-state">No tasks yet. Create one to get started! 🚀</p>';
      return;
    }

    // Render each task
    tasks.forEach(task => {
      renderTask(task);
    });

    console.log(`✅ Loaded ${tasks.length} tasks`);
  } catch (error) {
    console.error('Load tasks error:', error);
    tasksContainer.innerHTML = '<p class="empty-state">Failed to load tasks</p>';
  }
};

/**
 * Render a task item in the DOM
 * @param {Object} task - Task object
 */
const renderTask = (task) => {
  const taskClone = taskTemplate.content.cloneNode(true);
  const taskItem = taskClone.querySelector('.task-item');
  const taskTitle = taskClone.querySelector('.task-title');
  const taskStatus = taskClone.querySelector('.task-status');
  const taskDate = taskClone.querySelector('.task-date');
  const completeBtn = taskClone.querySelector('.task-complete-btn');
  const deleteBtn = taskClone.querySelector('.task-delete-btn');

  // Set task data
  taskTitle.textContent = task.title;
  taskStatus.textContent = task.status.toUpperCase();
  taskStatus.className = `task-status ${task.status}`;
  taskDate.textContent = formatDate(task.createdAt);

  // Add completed class if necessary
  if (task.status === 'completed') {
    taskItem.classList.add('completed');
    completeBtn.disabled = true;
    completeBtn.textContent = '✓ Completed';
  }

  // Event listeners
  completeBtn.addEventListener('click', () => {
    markTaskComplete(task.id);
  });

  deleteBtn.addEventListener('click', () => {
    deleteTask(task.id);
  });

  tasksContainer.appendChild(taskClone);
};

/**
 * Mark a task as completed
 * 
 * User Story: As a user, I can mark a task as completed, 
 * and it updates in the UI.
 * 
 * @param {string} taskId - Task ID
 */
const markTaskComplete = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'completed' }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to update task');
    }

    // Reload tasks and stats
    await loadTasks();
    await loadStats();

    console.log('✅ Task marked as completed:', result.data);
  } catch (error) {
    showError(`Error: ${error.message}`);
    console.error('Mark complete error:', error);
  }
};

/**
 * Delete a task
 * @param {string} taskId - Task ID
 */
const deleteTask = async (taskId) => {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete task');
    }

    // Reload tasks and stats
    await loadTasks();
    await loadStats();

    console.log('✅ Task deleted:', result.data);
  } catch (error) {
    showError(`Error: ${error.message}`);
    console.error('Delete task error:', error);
  }
};

/**
 * Load and display task statistics
 */
const loadStats = async () => {
  try {
    const response = await fetch(`${API_BASE}/stats`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to load statistics');
    }

    const stats = result.data;

    // Update stats display
    totalTasksEl.textContent = stats.totalTasks;
    completedTasksEl.textContent = stats.completedTasks;
    pendingTasksEl.textContent = stats.pendingTasks;
    completionRateEl.textContent = `${stats.completionRate}%`;

    console.log('✅ Statistics updated:', stats);
  } catch (error) {
    console.error('Load stats error:', error);
  }
};

/**
 * Initialize the application
 */
const init = async () => {
  console.log('🚀 Initializing Task Tracker application...');

  // Load initial tasks and stats
  await loadTasks();
  await loadStats();

  // Event listeners
  addBtn.addEventListener('click', createTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      createTask();
    }
  });

  console.log('✅ Application initialized successfully');
};

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
