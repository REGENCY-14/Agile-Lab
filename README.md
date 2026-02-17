# Task Tracker - Agile + DevOps Lab

A modern JavaScript-based Task Tracker web application demonstrating Agile and DevOps best practices.

## Features

- ✅ **Create Tasks** - Add new tasks with a title  
- ✅ **View Tasks** - Display all tasks with their current status  
- ✅ **Mark Complete** - Update task status to completed
- ✅ **Task Logging** - Track all task actions (creation, completion, errors)
- ✅ **Health Endpoint** - Monitor application status and uptime
- ✅ **Automated Testing** - Jest unit tests for all core features
- ✅ **CI/CD Pipeline** - GitHub Actions runs tests on every push

## Tech Stack

- **Backend:** Node.js + Express  
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Testing:** Jest
- **CI/CD:** GitHub Actions
- **Package Manager:** npm

## Project Structure

```
Agile-Lab/
├── src/
│   ├── server.js          # Express server setup
│   ├── app.js             # Application logic & routes
│   ├── taskManager.js     # Task CRUD operations
│   ├── logger.js          # Logging system
│   └── health.js          # Health endpoint handler
├── public/
│   ├── index.html         # Frontend HTML
│   ├── style.css          # Frontend styling
│   └── app.js             # Frontend JavaScript
├── tests/
│   ├── taskManager.test.js       # Task manager tests
│   ├── app.test.js               # API route tests
│   └── logger.test.js            # Logger tests
├── .github/
│   └── workflows/
│       └── ci.yml         # GitHub Actions workflow
├── .gitignore             # Node.js gitignore
├── package.json           # Project dependencies
└── README.md              # This file
```

## Installation

### Prerequisites

- Node.js (v14 or higher)  
- npm (v6 or higher)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/REGENCY-14/Agile-Lab.git
   cd Agile-Lab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`

## Usage

### Creating a Task

1. Navigate to the application in your browser
2. Enter a task title in the input field  
3. Click "Add Task"
4. The task appears in the list with status "pending"

### Viewing Tasks

All tasks display in a table with:
- Task ID
- Task Title
- Status (pending/completed)
- Created Date
- Action buttons

### Completing a Task

1. Click the "✓ Mark Complete" button next to any task
2. The status updates to "completed" in real-time
3. Action is logged automatically

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

## Running Locally

### Development Mode

```bash
npm run dev
```

Uses nodemon for automatic server restart on file changes.

### Production Build

```bash
npm start
```

## API Endpoints

### Task Management

- **POST /api/tasks** - Create a new task
  - Request: `{ "title": "Task title" }`
  - Response: `{ "id": "uuid", "title": "...", "status": "pending", "createdAt": "..." }`

- **GET /api/tasks** - Retrieve all tasks
  - Response: `[ { "id": "...", "title": "...", "status": "...", "createdAt": "..." } ]`

- **PUT /api/tasks/:id** - Update task status
  - Request: `{ "status": "completed" }`
  - Response: Updated task object

- **DELETE /api/tasks/:id** - Delete a task
  - Response: Success message

### Health Check

- **GET /health** - Application health status
  - Response:
    ```json
    {
      "status": "healthy",
      "uptime": 3600,
      "timestamp": "2024-01-15T10:30:00Z"
    }
    ```

## Logging

The application logs all task operations to the console and to `logs/app.log`:

- Task creation
- Task completion
- Task deletion
- API errors
- Server startup/shutdown events

Log Format:
```
[TIMESTAMP] [LEVEL] [CONTEXT] Message
```

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`):

1. **Triggers on:**
   - Push to `dev` and `main` branches
   - Pull requests

2. **Runs:**
   - Installs dependencies
   - Executes all Jest tests
   - Reports coverage metrics
   - Displays test results

3. **Success Criteria:**
   - All tests pass
   - No console errors

## Git Workflow

### Feature Branch Process

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Make commits:**
   ```bash
   git add .
   git commit -m "Description of change"
   ```

3. **Push to feature branch:**
   ```bash
   git push origin feature/feature-name
   ```

4. **Create Pull Request to `dev`**

5. **Merge to `dev` after review:**
   ```bash
   git checkout dev
   git merge feature/feature-name
   ```

6. **Merge `dev` to `main` for release:**
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```

### Branch Strategy

- **main** - Production-ready code
- **dev** - Integration branch for features
- **feature/*** - Feature development branches

## Agile Practices Implemented

✓ **User Stories** - Each feature implements a user story requirement  
✓ **Incremental Commits** - Small, meaningful commits per feature  
✓ **Sprint-Ready** - Clean, modular, and testable code  
✓ **Backlog Management** - Clear feature separation in code  

## DevOps Practices Implemented

✓ **Automated Testing** - Jest tests run automatically  
✓ **CI/CD Pipeline** - GitHub Actions for continuous integration  
✓ **Health Monitoring** - Health endpoint for application status  
✓ **Structured Logging** - Detailed logs for debugging and monitoring  
✓ **Infrastructure as Code** - GitHub Actions workflow YAML  

## Commands Reference

```bash
npm install          # Install dependencies
npm start            # Start production server
npm run dev          # Start with nodemon (dev mode)
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Error Handling

The application includes comprehensive error handling:

- Invalid task data validation
- Duplicate task prevention  
- Graceful error responses
- Detailed error logging

## Future Enhancements

- [ ] Task categories/tags
- [ ] Task priority levels
- [ ] Due dates
- [ ] Task filtering and sorting
- [ ] User authentication
- [ ] Database persistence (MongoDB/PostgreSQL)
- [ ] WebSocket support for real-time updates
- [ ] REST API rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch  
3. Make incremental commits
4. Ensure tests pass
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Last Updated:** February 2024  
**Maintained by:** Agile + DevOps Lab Team
