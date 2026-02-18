/**
 * Tests for Response Helper Utilities
 */

const {
  sendSuccess,
  sendCreated,
  sendError,
  sendValidationError,
  sendNotFound,
  sendBadRequest,
  sendPaginated,
  sendNoContent,
} = require('../src/responseHelper');

describe('Response Helper Utilities', () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe('sendSuccess', () => {
    test('should send success response with data', () => {
      const data = { id: 1, name: 'Test' };
      sendSuccess(mockRes, data, 'Success');
      
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Success',
          data,
        })
      );
    });

    test('should use custom status code', () => {
      sendSuccess(mockRes, {}, 'OK', 201);
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    test('should include timestamp', () => {
      sendSuccess(mockRes, {});
      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg.timestamp).toBeDefined();
    });
  });

  describe('sendCreated', () => {
    test('should send 201 Created response', () => {
      const data = { id: 1 };
      sendCreated(mockRes, data);
      
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data,
        })
      );
    });
  });

  describe('sendError', () => {
    test('should send error response', () => {
      sendError(mockRes, 'Error occurred', 500);
      
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: expect.objectContaining({
            message: 'Error occurred',
            statusCode: 500,
          }),
        })
      );
    });

    test('should include error details when provided', () => {
      const details = { field: 'email' };
      sendError(mockRes, 'Validation error', 400, details);
      
      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg.error.details).toEqual(details);
    });

    test('should use default message and status', () => {
      sendError(mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe('sendValidationError', () => {
    test('should send 422 validation error', () => {
      const errors = { title: 'Required' };
      sendValidationError(mockRes, errors);
      
      expect(mockRes.status).toHaveBeenCalledWith(422);
      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg.error.details.validationErrors).toEqual(errors);
    });
  });

  describe('sendNotFound', () => {
    test('should send 404 not found', () => {
      sendNotFound(mockRes, 'Task');
      
      expect(mockRes.status).toHaveBeenCalledWith(404);
      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg.error.message).toContain('Task');
    });

    test('should use default resource name', () => {
      sendNotFound(mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe('sendBadRequest', () => {
    test('should send 400 bad request', () => {
      sendBadRequest(mockRes, 'Invalid input');
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg.error.message).toBe('Invalid input');
    });
  });

  describe('sendPaginated', () => {
    test('should send paginated response', () => {
      const paginatedData = {
        tasks: [{ id: 1 }, { id: 2 }],
        page: 1,
        pageSize: 10,
        totalPages: 5,
        totalItems: 50,
        hasNextPage: true,
        hasPrevPage: false,
      };
      
      sendPaginated(mockRes, paginatedData);
      
      expect(mockRes.status).toHaveBeenCalledWith(200);
      const callArg = mockRes.json.mock.calls[0][0];
      expect(callArg.data).toEqual(paginatedData.tasks);
      expect(callArg.pagination).toBeDefined();
      expect(callArg.pagination.page).toBe(1);
      expect(callArg.pagination.totalItems).toBe(50);
    });
  });

  describe('sendNoContent', () => {
    test('should send 204 no content', () => {
      sendNoContent(mockRes);
      
      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalled();
    });
  });
});
