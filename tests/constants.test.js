/**
 * Tests for Constants Module
 */

const {
  HTTP_STATUS,
  TASK_STATUS,
  VALID_TASK_STATUSES,
  LOG_LEVEL,
  TIME,
  LIMITS,
  DEFAULTS,
  MESSAGES,
  REGEX,
  ENVIRONMENT,
  MEMORY,
} = require('../src/constants');

describe('Constants Module', () => {
  describe('HTTP_STATUS', () => {
    test('should have standard status codes', () => {
      expect(HTTP_STATUS.OK).toBe(200);
      expect(HTTP_STATUS.CREATED).toBe(201);
      expect(HTTP_STATUS.BAD_REQUEST).toBe(400);
      expect(HTTP_STATUS.NOT_FOUND).toBe(404);
      expect(HTTP_STATUS.INTERNAL_SERVER_ERROR).toBe(500);
    });
  });

  describe('TASK_STATUS', () => {
    test('should have task status values', () => {
      expect(TASK_STATUS.PENDING).toBe('pending');
      expect(TASK_STATUS.COMPLETED).toBe('completed');
    });
  });

  describe('VALID_TASK_STATUSES', () => {
    test('should be an array of valid statuses', () => {
      expect(Array.isArray(VALID_TASK_STATUSES)).toBe(true);
      expect(VALID_TASK_STATUSES).toContain('pending');
      expect(VALID_TASK_STATUSES).toContain('completed');
    });
  });

  describe('LOG_LEVEL', () => {
    test('should have log levels', () => {
      expect(LOG_LEVEL.DEBUG).toBe('debug');
      expect(LOG_LEVEL.INFO).toBe('info');
      expect(LOG_LEVEL.WARN).toBe('warn');
      expect(LOG_LEVEL.ERROR).toBe('error');
    });
  });

  describe('TIME', () => {
    test('should have time constants', () => {
      expect(TIME.SECOND).toBe(1000);
      expect(TIME.MINUTE).toBe(60000);
      expect(TIME.HOUR).toBe(3600000);
      expect(TIME.DAY).toBe(86400000);
    });
  });

  describe('LIMITS', () => {
    test('should have limit values', () => {
      expect(LIMITS.MAX_TASK_TITLE_LENGTH).toBe(200);
      expect(LIMITS.DEFAULT_PAGE_SIZE).toBe(10);
      expect(typeof LIMITS.MAX_TASKS_PER_USER).toBe('number');
    });
  });

  describe('DEFAULTS', () => {
    test('should have default values', () => {
      expect(DEFAULTS.PORT).toBe(3000);
      expect(DEFAULTS.HOST).toBe('localhost');
      expect(typeof DEFAULTS.REQUEST_TIMEOUT).toBe('number');
    });
  });

  describe('MESSAGES', () => {
    test('should have message constants', () => {
      expect(typeof MESSAGES.TASK_CREATED).toBe('string');
      expect(typeof MESSAGES.TASK_NOT_FOUND).toBe('string');
      expect(MESSAGES.TASK_CREATED.length).toBeGreaterThan(0);
    });
  });

  describe('REGEX', () => {
    test('should have regex patterns', () => {
      expect(REGEX.TASK_ID).toBeInstanceOf(RegExp);
      expect(REGEX.ISO_DATE).toBeInstanceOf(RegExp);
    });

    test('TASK_ID regex should match valid IDs', () => {
      expect(REGEX.TASK_ID.test('task-123-abc')).toBe(true);
      expect(REGEX.TASK_ID.test('invalid')).toBe(false);
    });
  });

  describe('ENVIRONMENT', () => {
    test('should have environment constants', () => {
      expect(ENVIRONMENT.DEVELOPMENT).toBe('development');
      expect(ENVIRONMENT.PRODUCTION).toBe('production');
      expect(ENVIRONMENT.TEST).toBe('test');
    });
  });

  describe('MEMORY', () => {
    test('should have memory conversion constants', () => {
      expect(MEMORY.KB).toBe(1024);
      expect(MEMORY.MB).toBe(1024 * 1024);
      expect(MEMORY.GB).toBe(1024 * 1024 * 1024);
    });
  });
});
