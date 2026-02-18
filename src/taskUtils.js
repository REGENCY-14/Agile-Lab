/**
 * Task Utilities Module
 * 
 * Provides helper functions for task manipulation, filtering, and sorting.
 * These utilities support advanced task management features.
 */

/**
 * Filter tasks by status
 * @param {Array} tasks - Array of task objects
 * @param {string} status - Status to filter by ('pending' or 'completed')
 * @returns {Array} Filtered tasks
 */
const filterByStatus = (tasks, status) => {
  if (!status || !Array.isArray(tasks)) {
    return tasks;
  }
  return tasks.filter(task => task.status === status);
};

/**
 * Search tasks by title
 * @param {Array} tasks - Array of task objects
 * @param {string} searchTerm - Search term to match in titles
 * @returns {Array} Matching tasks
 */
const searchTasks = (tasks, searchTerm) => {
  if (!searchTerm || !Array.isArray(tasks)) {
    return tasks;
  }
  
  const term = searchTerm.toLowerCase().trim();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(term)
  );
};

/**
 * Sort tasks by creation date
 * @param {Array} tasks - Array of task objects
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted tasks
 */
const sortByDate = (tasks, order = 'desc') => {
  if (!Array.isArray(tasks)) {
    return tasks;
  }
  
  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Sort tasks by title alphabetically
 * @param {Array} tasks - Array of task objects
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted tasks
 */
const sortByTitle = (tasks, order = 'asc') => {
  if (!Array.isArray(tasks)) {
    return tasks;
  }
  
  return [...tasks].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    
    if (order === 'asc') {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });
};

/**
 * Get task statistics
 * @param {Array} tasks - Array of task objects
 * @returns {Object} Task statistics
 */
const getTaskStatistics = (tasks) => {
  if (!Array.isArray(tasks)) {
    return {
      total: 0,
      pending: 0,
      completed: 0,
      completionRate: 0,
    };
  }
  
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    total,
    pending,
    completed,
    completionRate,
  };
};

/**
 * Paginate tasks
 * @param {Array} tasks - Array of task objects
 * @param {number} page - Page number (1-based)
 * @param {number} pageSize - Number of items per page
 * @returns {Object} Paginated result with tasks and metadata
 */
const paginateTasks = (tasks, page = 1, pageSize = 10) => {
  if (!Array.isArray(tasks)) {
    return {
      tasks: [],
      page: 1,
      pageSize: 10,
      totalPages: 0,
      totalItems: 0,
    };
  }
  
  const totalItems = tasks.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTasks = tasks.slice(startIndex, endIndex);
  
  return {
    tasks: paginatedTasks,
    page: currentPage,
    pageSize,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

module.exports = {
  filterByStatus,
  searchTasks,
  sortByDate,
  sortByTitle,
  getTaskStatistics,
  paginateTasks,
};
