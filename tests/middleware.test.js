/**
 * Tests for Middleware
 */

const {
  requestLogger,
  errorHandler,
  notFoundHandler,
  requestTimeout,
} = require('../src/middleware');

describe('Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      method: 'GET',
      url: '/api/tasks',
      ip: '127.0.0.1',
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      on: jest.fn(),
      headersSent: false,
    };
    mockNext = jest.fn();
  });

  describe('requestLogger', () => {
    test('should log request and call next', () => {
      requestLogger(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.on).toHaveBeenCalledWith('finish', expect.any(Function));
    });

    test('should capture response finish event', () => {
      requestLogger(mockReq, mockRes, mockNext);
      expect(mockRes.on).toHaveBeenCalledWith('finish', expect.any(Function));
    });
  });

  describe('errorHandler', () => {
    test('should handle error with custom status code', () => {
      const error = new Error('Test error');
      error.statusCode = 400;
      
      errorHandler(error, mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            message: 'Test error',
            statusCode: 400,
          }),
        })
      );
    });

    test('should default to 500 for errors without status code', () => {
      const error = new Error('Test error');
      
      errorHandler(error, mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });

    test('should include timestamp and path', () => {
      const error = new Error('Test');
      errorHandler(error, mockReq, mockRes, mockNext);
      
      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg.error.timestamp).toBeDefined();
      expect(callArg.error.path).toBe('/api/tasks');
    });
  });

  describe('notFoundHandler', () => {
    test('should return 404 with error message', () => {
      notFoundHandler(mockReq, mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            message: 'Resource not found',
            statusCode: 404,
          }),
        })
      );
    });

    test('should include request path', () => {
      notFoundHandler(mockReq, mockRes);
      
      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg.error.path).toBe('/api/tasks');
    });
  });

  describe('requestTimeout', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('should return middleware function', () => {
      const middleware = requestTimeout(5000);
      expect(typeof middleware).toBe('function');
    });

    test('should call next immediately', () => {
      const middleware = requestTimeout(5000);
      middleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    test('should set up finish event listener', () => {
      const middleware = requestTimeout(5000);
      middleware(mockReq, mockRes, mockNext);
      expect(mockRes.on).toHaveBeenCalledWith('finish', expect.any(Function));
    });

    test('should send timeout error after timeout period', () => {
      const middleware = requestTimeout(1000);
      middleware(mockReq, mockRes, mockNext);
      
      jest.advanceTimersByTime(1001);
      
      expect(mockRes.status).toHaveBeenCalledWith(408);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            message: 'Request timeout',
            statusCode: 408,
          }),
        })
      );
    });

    test('should not send timeout if headers already sent', () => {
      mockRes.headersSent = true;
      const middleware = requestTimeout(1000);
      middleware(mockReq, mockRes, mockNext);
      
      jest.advanceTimersByTime(1001);
      
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    test('should use default timeout of 30000ms', () => {
      const middleware = requestTimeout();
      expect(typeof middleware).toBe('function');
    });
  });
});
