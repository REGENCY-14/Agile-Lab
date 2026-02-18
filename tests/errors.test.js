/**
 * Tests for Custom Error Classes
 */

const {
  ApplicationError,
  ValidationError,
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
  ServiceUnavailableError,
  DatabaseError,
  isApplicationError,
  formatErrorForLogging,
} = require('../src/errors');

describe('Custom Error Classes', () => {
  describe('ApplicationError', () => {
    test('should create error with message and status code', () => {
      const error = new ApplicationError('Test error', 500);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe('ApplicationError');
      expect(error.timestamp).toBeDefined();
    });

    test('should have default status code', () => {
      const error = new ApplicationError('Test error');
      expect(error.statusCode).toBe(500);
    });

    test('should include details', () => {
      const details = { field: 'email' };
      const error = new ApplicationError('Test', 400, details);
      expect(error.details).toEqual(details);
    });

    test('should convert to JSON', () => {
      const error = new ApplicationError('Test', 400);
      const json = error.toJSON();
      expect(json.name).toBe('ApplicationError');
      expect(json.message).toBe('Test');
      expect(json.statusCode).toBe(400);
    });

    test('should have stack trace', () => {
      const error = new ApplicationError('Test');
      expect(error.stack).toBeDefined();
    });
  });

  describe('ValidationError', () => {
    test('should create validation error', () => {
      const errors = { title: 'Required' };
      const error = new ValidationError('Validation failed', errors);
      expect(error.statusCode).toBe(422);
      expect(error.details).toEqual(errors);
    });
  });

  describe('NotFoundError', () => {
    test('should create not found error with resource', () => {
      const error = new NotFoundError('Task');
      expect(error.statusCode).toBe(404);
      expect(error.message).toContain('Task');
      expect(error.resource).toBe('Task');
    });

    test('should include identifier in message', () => {
      const error = new NotFoundError('Task', '123');
      expect(error.message).toContain('123');
      expect(error.identifier).toBe('123');
    });
  });

  describe('BadRequestError', () => {
    test('should create bad request error', () => {
      const error = new BadRequestError('Invalid input');
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid input');
    });

    test('should have default message', () => {
      const error = new BadRequestError();
      expect(error.message).toBe('Bad request');
    });
  });

  describe('ConflictError', () => {
    test('should create conflict error', () => {
      const error = new ConflictError('Duplicate task');
      expect(error.statusCode).toBe(409);
      expect(error.message).toBe('Duplicate task');
    });

    test('should have default message', () => {
      const error = new ConflictError();
      expect(error.message).toBe('Resource already exists');
    });
  });

  describe('UnauthorizedError', () => {
    test('should create unauthorized error', () => {
      const error = new UnauthorizedError();
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Authentication required');
    });
  });

  describe('ForbiddenError', () => {
    test('should create forbidden error', () => {
      const error = new ForbiddenError();
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Access denied');
    });
  });

  describe('ServiceUnavailableError', () => {
    test('should create service unavailable error', () => {
      const error = new ServiceUnavailableError();
      expect(error.statusCode).toBe(503);
    });
  });

  describe('DatabaseError', () => {
    test('should create database error', () => {
      const originalError = new Error('Connection failed');
      const error = new DatabaseError('DB error', originalError);
      expect(error.statusCode).toBe(500);
      expect(error.details.originalError).toBe('Connection failed');
    });

    test('should work without original error', () => {
      const error = new DatabaseError();
      expect(error.message).toBe('Database operation failed');
    });
  });

  describe('isApplicationError', () => {
    test('should identify application errors', () => {
      const error = new ApplicationError('Test');
      expect(isApplicationError(error)).toBe(true);
    });

    test('should identify derived errors', () => {
      expect(isApplicationError(new ValidationError('test'))).toBe(true);
      expect(isApplicationError(new NotFoundError('Task'))).toBe(true);
    });

    test('should reject native errors', () => {
      const error = new Error('Test');
      expect(isApplicationError(error)).toBe(false);
    });
  });

  describe('formatErrorForLogging', () => {
    test('should format application error', () => {
      const error = new ApplicationError('Test', 400);
      const formatted = formatErrorForLogging(error);
      expect(formatted.name).toBe('ApplicationError');
      expect(formatted.message).toBe('Test');
      expect(formatted.statusCode).toBe(400);
      expect(formatted.stack).toBeDefined();
    });

    test('should format native error', () => {
      const error = new Error('Test');
      const formatted = formatErrorForLogging(error);
      expect(formatted.name).toBe('Error');
      expect(formatted.message).toBe('Test');
      expect(formatted.stack).toBeDefined();
    });

    test('should include details for application errors', () => {
      const error = new ValidationError('Test', { field: 'email' });
      const formatted = formatErrorForLogging(error);
      expect(formatted.details).toEqual({ field: 'email' });
    });
  });
});
