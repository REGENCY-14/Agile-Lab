/**
 * Express App Routes Tests
 * 
 * Tests for API endpoints:
 * - POST /api/tasks
 * - GET /api/tasks
 * - GET /api/tasks/:id
 * - PUT /api/tasks/:id
 * - DELETE /api/tasks/:id
 * - GET /health
 * - GET /api/stats
 */

const request = require('supertest');
const app = require('../src/app');
const taskManager = require('../src/taskManager');

describe('Task Tracker API', () => {
  // Clear tasks before each test
  beforeEach(() => {
    taskManager.clearTasks();
  });

  describe('POST /api/tasks', () => {
    test('should create a task with valid data', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'New Task' })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe('New Task');
      expect(response.body.data.status).toBe('pending');
    });

    test('should return error for empty title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should return error for missing title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/tasks', () => {
    test('should return empty array initially', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.count).toBe(0);
    });

    test('should return all created tasks', async () => {
      // Create some tasks
      await request(app)
        .post('/api/tasks')
        .send({ title: 'Task 1' });

      await request(app)
        .post('/api/tasks')
        .send({ title: 'Task 2' });

      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.count).toBe(2);
    });
  });

  describe('GET /api/tasks/:id', () => {
    test('should return task by ID', async () => {
      // Create a task
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task' });

      const taskId = createResponse.body.data.id;

      const getResponse = await request(app)
        .get(`/api/tasks/${taskId}`)
        .expect(200);

      expect(getResponse.body.success).toBe(true);
      expect(getResponse.body.data.id).toBe(taskId);
      expect(getResponse.body.data.title).toBe('Test Task');
    });

    test('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .get('/api/tasks/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    test('should update task status to completed', async () => {
      // Create a task
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task' });

      const taskId = createResponse.body.data.id;

      // Update status
      const updateResponse = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ status: 'completed' })
        .expect(200);

      expect(updateResponse.body.success).toBe(true);
      expect(updateResponse.body.data.status).toBe('completed');
    });

    test('should return error for invalid status', async () => {
      // Create a task
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task' });

      const taskId = createResponse.body.data.id;

      // Try to update with invalid status
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({ status: 'invalid' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should return error for non-existent task', async () => {
      const response = await request(app)
        .put('/api/tasks/non-existent-id')
        .send({ status: 'completed' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    test('should delete a task', async () => {
      // Create a task
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task' });

      const taskId = createResponse.body.data.id;

      // Delete the task
      const deleteResponse = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .expect(200);

      expect(deleteResponse.body.success).toBe(true);

      // Verify it's deleted
      await request(app)
        .get(`/api/tasks/${taskId}`)
        .expect(404);
    });

    test('should return error for non-existent task', async () => {
      const response = await request(app)
        .delete('/api/tasks/non-existent-id')
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/stats', () => {
    test('should return stats for empty task list', async () => {
      const response = await request(app)
        .get('/api/stats')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual({
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        completionRate: 0,
      });
    });

    test('should calculate stats correctly', async () => {
      // Create and complete some tasks
      const task1 = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task 1' });

      const task2 = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task 2' });

      await request(app)
        .post('/api/tasks')
        .send({ title: 'Task 3' });

      // Complete first task
      await request(app)
        .put(`/api/tasks/${task1.body.data.id}`)
        .send({ status: 'completed' });

      // Complete second task
      await request(app)
        .put(`/api/tasks/${task2.body.data.id}`)
        .send({ status: 'completed' });

      const response = await request(app)
        .get('/api/stats')
        .expect(200);

      expect(response.body.data).toEqual({
        totalTasks: 3,
        completedTasks: 2,
        pendingTasks: 1,
        completionRate: 67,
      });
    });
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('healthy');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
      expect(typeof response.body.uptime).toBe('number');
    });

    test('should include memory information', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.memory).toBeDefined();
      expect(response.body.memory.heapUsed).toBeDefined();
      expect(response.body.memory.heapTotal).toBeDefined();
    });
  });

  describe('GET /', () => {
    test('should serve index.html', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.type).toMatch(/html/);
    });
  });

  describe('404 Not Found', () => {
    test('should return 404 for undefined routes', async () => {
      const response = await request(app)
        .get('/undefined-route')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not found');
    });
  });
});
