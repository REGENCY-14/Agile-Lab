/**
 * Task Manager Tests
 * 
 * Tests for task CRUD operations:
 * - Create task
 * - Retrieve tasks
 * - Update task status
 * - Delete task
 * - Task validation
 */

const taskManager = require('../src/taskManager');

describe('TaskManager', () => {
  // Clear tasks before each test
  beforeEach(() => {
    taskManager.clearTasks();
  });

  describe('createTask', () => {
    test('should create a task with valid title', () => {
      const task = taskManager.createTask('Test Task');

      expect(task).toBeDefined();
      expect(task.title).toBe('Test Task');
      expect(task.status).toBe('pending');
      expect(task.id).toBeDefined();
      expect(task.createdAt).toBeDefined();
      expect(task.updatedAt).toBeDefined();
    });

    test('should throw error for empty title', () => {
      expect(() => {
        taskManager.createTask('');
      }).toThrow('Task title is required');
    });

    test('should throw error for null title', () => {
      expect(() => {
        taskManager.createTask(null);
      }).toThrow('Task title is required');
    });

    test('should throw error for non-string title', () => {
      expect(() => {
        taskManager.createTask(123);
      }).toThrow('Task title is required');
    });

    test('should trim whitespace from title', () => {
      const task = taskManager.createTask('  Trimmed Task  ');
      expect(task.title).toBe('Trimmed Task');
    });

    test('should increment task count', () => {
      expect(taskManager.getTaskCount()).toBe(0);
      taskManager.createTask('Task 1');
      expect(taskManager.getTaskCount()).toBe(1);
      taskManager.createTask('Task 2');
      expect(taskManager.getTaskCount()).toBe(2);
    });

    test('should generate unique IDs', () => {
      const task1 = taskManager.createTask('Task 1');
      const task2 = taskManager.createTask('Task 2');
      expect(task1.id).not.toBe(task2.id);
    });
  });

  describe('getTasks', () => {
    test('should return empty array initially', () => {
      const tasks = taskManager.getTasks();
      expect(tasks).toEqual([]);
    });

    test('should return all created tasks', () => {
      taskManager.createTask('Task 1');
      taskManager.createTask('Task 2');
      taskManager.createTask('Task 3');

      const tasks = taskManager.getTasks();
      expect(tasks).toHaveLength(3);
      expect(tasks[0].title).toBe('Task 1');
      expect(tasks[1].title).toBe('Task 2');
      expect(tasks[2].title).toBe('Task 3');
    });

    test('should return copy of tasks array', () => {
      taskManager.createTask('Original Task');
      const tasks = taskManager.getTasks();

      // Modify returned array
      tasks[0].title = 'Modified Task';

      // Original should not be modified
      const originalTasks = taskManager.getTasks();
      expect(originalTasks[0].title).toBe('Original Task');
    });
  });

  describe('getTaskById', () => {
    test('should return task by ID', () => {
      const created = taskManager.createTask('Test Task');
      const retrieved = taskManager.getTaskById(created.id);

      expect(retrieved).toBeDefined();
      expect(retrieved.id).toBe(created.id);
      expect(retrieved.title).toBe('Test Task');
    });

    test('should return null for non-existent ID', () => {
      const task = taskManager.getTaskById('non-existent-id');
      expect(task).toBeNull();
    });
  });

  describe('updateTaskStatus', () => {
    test('should update task status to completed', () => {
      const created = taskManager.createTask('Test Task');
      const updated = taskManager.updateTaskStatus(created.id, 'completed');

      expect(updated.status).toBe('completed');
      expect(updated.updatedAt).toBeDefined();
    });

    test('should throw error for invalid status', () => {
      const task = taskManager.createTask('Test Task');

      expect(() => {
        taskManager.updateTaskStatus(task.id, 'invalid-status');
      }).toThrow('Status must be one of');
    });

    test('should throw error for non-existent task', () => {
      expect(() => {
        taskManager.updateTaskStatus('non-existent-id', 'completed');
      }).toThrow('Task with ID');
    });

    test('should return updated task object', () => {
      const created = taskManager.createTask('Test Task');
      const updated = taskManager.updateTaskStatus(created.id, 'completed');

      expect(updated).toEqual(expect.objectContaining({
        id: created.id,
        title: 'Test Task',
        status: 'completed',
      }));
    });

    test('should allow updating back to pending', () => {
      const task = taskManager.createTask('Test Task');
      taskManager.updateTaskStatus(task.id, 'completed');
      const updated = taskManager.updateTaskStatus(task.id, 'pending');

      expect(updated.status).toBe('pending');
    });
  });

  describe('deleteTask', () => {
    test('should delete task by ID', () => {
      const task = taskManager.createTask('Test Task');
      const deleted = taskManager.deleteTask(task.id);

      expect(deleted.id).toBe(task.id);
      expect(taskManager.getTaskCount()).toBe(0);
    });

    test('should throw error for non-existent task', () => {
      expect(() => {
        taskManager.deleteTask('non-existent-id');
      }).toThrow('Task with ID');
    });

    test('should remove task from list', () => {
      const task1 = taskManager.createTask('Task 1');
      const task2 = taskManager.createTask('Task 2');

      taskManager.deleteTask(task1.id);

      const tasks = taskManager.getTasks();
      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe(task2.id);
    });
  });

  describe('getCompletedTaskCount', () => {
    test('should return 0 for all pending tasks', () => {
      taskManager.createTask('Task 1');
      taskManager.createTask('Task 2');

      expect(taskManager.getCompletedTaskCount()).toBe(0);
    });

    test('should count completed tasks', () => {
      const task1 = taskManager.createTask('Task 1');
      const task2 = taskManager.createTask('Task 2');
      taskManager.createTask('Task 3');

      taskManager.updateTaskStatus(task1.id, 'completed');
      taskManager.updateTaskStatus(task2.id, 'completed');

      expect(taskManager.getCompletedTaskCount()).toBe(2);
    });

    test('should update count when task status changes', () => {
      const task = taskManager.createTask('Task 1');
      expect(taskManager.getCompletedTaskCount()).toBe(0);

      taskManager.updateTaskStatus(task.id, 'completed');
      expect(taskManager.getCompletedTaskCount()).toBe(1);

      taskManager.updateTaskStatus(task.id, 'pending');
      expect(taskManager.getCompletedTaskCount()).toBe(0);
    });
  });

  describe('clearTasks', () => {
    test('should clear all tasks', () => {
      taskManager.createTask('Task 1');
      taskManager.createTask('Task 2');
      expect(taskManager.getTaskCount()).toBe(2);

      taskManager.clearTasks();
      expect(taskManager.getTaskCount()).toBe(0);
      expect(taskManager.getTasks()).toHaveLength(0);
    });
  });
});
