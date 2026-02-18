/**
 * Tests for Validation Utilities
 */

const {
  isNonEmptyString,
  validateTaskTitle,
  validateTaskStatus,
  validateTaskId,
  sanitizeInput,
} = require('../src/validation');

describe('Validation Utilities', () => {
  describe('isNonEmptyString', () => {
    test('should return true for valid non-empty string', () => {
      expect(isNonEmptyString('test')).toBe(true);
      expect(isNonEmptyString('hello world')).toBe(true);
    });

    test('should return false for empty string', () => {
      expect(isNonEmptyString('')).toBe(false);
      expect(isNonEmptyString('   ')).toBe(false);
    });

    test('should return false for non-string values', () => {
      expect(isNonEmptyString(null)).toBe(false);
      expect(isNonEmptyString(undefined)).toBe(false);
      expect(isNonEmptyString(123)).toBe(false);
      expect(isNonEmptyString({})).toBe(false);
    });
  });

  describe('validateTaskTitle', () => {
    test('should validate correct task title', () => {
      const result = validateTaskTitle('Valid Task');
      expect(result.valid).toBe(true);
      expect(result.error).toBe(null);
    });

    test('should reject null or undefined title', () => {
      expect(validateTaskTitle(null).valid).toBe(false);
      expect(validateTaskTitle(undefined).valid).toBe(false);
      expect(validateTaskTitle(null).error).toBe('Task title is required');
    });

    test('should reject non-string title', () => {
      const result = validateTaskTitle(123);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Task title must be a string');
    });

    test('should reject empty title', () => {
      const result = validateTaskTitle('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Task title cannot be empty');
    });

    test('should reject title over 200 characters', () => {
      const longTitle = 'a'.repeat(201);
      const result = validateTaskTitle(longTitle);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Task title must be 200 characters or less');
    });

    test('should accept title exactly 200 characters', () => {
      const maxTitle = 'a'.repeat(200);
      const result = validateTaskTitle(maxTitle);
      expect(result.valid).toBe(true);
    });
  });

  describe('validateTaskStatus', () => {
    test('should validate pending status', () => {
      const result = validateTaskStatus('pending');
      expect(result.valid).toBe(true);
      expect(result.error).toBe(null);
    });

    test('should validate completed status', () => {
      const result = validateTaskStatus('completed');
      expect(result.valid).toBe(true);
    });

    test('should reject invalid status', () => {
      const result = validateTaskStatus('invalid');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Status must be one of');
    });

    test('should reject null or undefined status', () => {
      expect(validateTaskStatus(null).valid).toBe(false);
      expect(validateTaskStatus(undefined).valid).toBe(false);
    });
  });

  describe('validateTaskId', () => {
    test('should validate correct task ID format', () => {
      const result = validateTaskId('task-123456789-abc123');
      expect(result.valid).toBe(true);
      expect(result.error).toBe(null);
    });

    test('should reject null or undefined', () => {
      expect(validateTaskId(null).valid).toBe(false);
      expect(validateTaskId(undefined).valid).toBe(false);
    });

    test('should reject non-string ID', () => {
      const result = validateTaskId(123);
      expect(result.valid).toBe(false);
    });

    test('should reject ID without task- prefix', () => {
      const result = validateTaskId('abc-123');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid task ID format');
    });
  });

  describe('sanitizeInput', () => {
    test('should remove angle brackets', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
    });

    test('should remove javascript: protocol', () => {
      expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
      expect(sanitizeInput('JavaScript:alert(1)')).toBe('alert(1)');
    });

    test('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    test('should limit length to 1000 characters', () => {
      const longInput = 'a'.repeat(2000);
      expect(sanitizeInput(longInput).length).toBe(1000);
    });

    test('should handle non-string input', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput(123)).toBe('');
    });

    test('should preserve safe content', () => {
      expect(sanitizeInput('Hello World')).toBe('Hello World');
    });
  });
});
