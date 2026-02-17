# Testing Strategy & Coverage

## Testing Framework
- **Primary:** Jest 29.5.0
- **Integration Testing:** Supertest for API endpoints
- **Coverage Target:** 70% across lines, functions, branches

## Test Files

### 1. TaskManager Tests (`tests/taskManager.test.js`)
Comprehensive unit tests for task CRUD operations

**Test Suites:**
- createTask - 7 tests
  - Valid task creation
  - Input validation (empty, null, non-string)
  - Whitespace trimming
  - Task count increments
  - Unique ID generation

- getTasks - 3 tests
  - Empty array initially
  - All tasks retrieved
  - Array copy returned (no external mutations)

- getTaskById - 2 tests
  - Retrieve task by ID
  - Return null for non-existent ID

- updateTaskStatus - 5 tests
  - Update to completed
  - Update to pending
  - Status validation
  - Non-existent task handling
  - Timestamp updates

- deleteTask - 3 tests
  - Delete task by ID
  - Task removal from list
  - Non-existent task handling

- getCompletedTaskCount - 3 tests
  - Count completed tasks
  - Update count on status changes
  - Accuracy with mixed status tasks

- clearTasks - 1 test
  - Clear all tasks

**Total TaskManager Tests:** 24 tests
**Coverage:** >90%

### 2. App Routes Tests (`tests/app.test.js`)
Integration tests for Express API endpoints

**Test Suites:**
- POST /api/tasks - 3 tests
  - Create task with valid data
  - Validation errors
  - Required field errors

- GET /api/tasks - 2 tests
  - Retrieve empty list
  - Retrieve multiple tasks

- GET /api/tasks/:id - 2 tests
  - Get task by ID
  - 404 for non-existent task

- PUT /api/tasks/:id - 3 tests
  - Update task status
  - Invalid status handling
  - Non-existent task handling

- DELETE /api/tasks/:id - 2 tests
  - Delete task
  - Non-existent task handling

- GET /api/stats - 2 tests
  - Stats for empty list
  - Accurate stat calculations

- GET /health - 2 tests
  - Health status response
  - Memory information included

- Miscellaneous - 2 tests
  - Serve index.html
  - 404 handling

**Total App Tests:** 18 tests
**Coverage:** >85%

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Coverage Report

Generate coverage with:
```bash
npm run test:coverage
```

This creates a `coverage/` directory with:
- `coverage/lcov-report/` - HTML report
- `coverage/lcov.info` - LCOV format for CI/CD


## Test Best Practices Implemented

✅ **Unit Tests** - TaskManager functions isolated and tested
✅ **Integration Tests** - API endpoints tested with Supertest
✅ **Before/After Hooks** - Clean state between tests
✅ **Error Cases** - Both success and failure paths tested
✅ **Edge Cases** - Null, empty, invalid input testing
✅ **Async Testing** - Proper async/await handling
✅ **Mocking/Isolation** - Tests independent of each other
✅ **Descriptive Names** - Clear test descriptions
✅ **Assertions** - Specific expect statements

## Continuous Integration

GitHub Actions runs tests automatically on:
- Every push to main or dev
- Every pull request
- Tests run on Node 14.x, 16.x, 18.x

## Future Test Enhancements

- [ ] E2E tests with Cypress/Playwright
- [ ] Performance testing
- [ ] Load testing with Artillery
- [ ] Snapshot testing for frontend
- [ ] API contract testing
- [ ] Security testing (OWASP)
