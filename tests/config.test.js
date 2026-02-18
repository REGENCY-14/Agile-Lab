/**
 * Tests for Config Module
 */

const config = require('../src/config');

describe('Config Module', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('should export server configuration', () => {
    expect(config.server).toBeDefined();
    expect(config.server.port).toBeDefined();
    expect(config.server.host).toBeDefined();
    expect(config.server.env).toBeDefined();
  });

  test('should export logging configuration', () => {
    expect(config.logging).toBeDefined();
    expect(config.logging.level).toBeDefined();
    expect(config.logging.logToFile).toBeDefined();
    expect(config.logging.logDir).toBeDefined();
  });

  test('should export app configuration', () => {
    expect(config.app).toBeDefined();
    expect(config.app.name).toBeDefined();
    expect(config.app.version).toBeDefined();
    expect(config.app.maxTasksPerUser).toBeDefined();
  });

  test('should export feature flags', () => {
    expect(config.features).toBeDefined();
    expect(config.features.enableHealthCheck).toBeDefined();
    expect(config.features.enableDebugMode).toBeDefined();
  });

  test('should have default values', () => {
    expect(config.server.port).toBe(3000);
    expect(config.server.host).toBe('localhost');
    expect(config.logging.level).toBe('info');
    expect(config.app.name).toBe('Agile Lab Task Tracker');
  });
});
