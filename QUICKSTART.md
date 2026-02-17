# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- **Node.js** v14 or higher
- **npm** v6 or higher
- **Git** for version control

### Installation

1. **Navigate to the project:**
   ```bash
   cd c:\Users\ZakariaOsman\Desktop\AGILE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

That's it! 🎉 The application is now running.

---

## 📋 Common Commands

### Development

```bash
npm run dev              # Start with auto-reload (nodemon)
npm start              # Start production server
npm test               # Run all tests
npm run test:watch    # Run tests with auto-reload
npm run test:coverage # Generate coverage report
```

### Monitoring

```bash
# Check application health
curl http://localhost:3000/health

# Check task statistics
curl http://localhost:3000/api/stats

# View logs
tail -f logs/app.log
```

---

## 🧪 Testing Your First Task Creation

### Using the Web UI

1. Open http://localhost:3000
2. Enter a task in the input field
3. Click "Add Task" or press Enter
4. See the task appear in the list with "pending" status
5. Click "✓ Complete" to mark it done
6. Click "🗑️ Delete" to remove it

### Using cURL

```bash
# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Task"}'

# Get all tasks
curl http://localhost:3000/api/tasks

# Complete a task (replace ID)
curl -X PUT http://localhost:3000/api/tasks/task-XXXXX \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'

# Delete a task
curl -X DELETE http://localhost:3000/api/tasks/task-XXXXX
```

---

## 🔄 Git Workflow (Feature Development)

### Create a New Feature

```bash
# Start from dev branch
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ... edit files ...

# Commit changes
git add .
git commit -m "feat: describe your feature"

# Push to feature branch
git push origin feature/my-feature

# Create Pull Request (merge to dev)
# After review, merge to dev
git checkout dev
git merge feature/my-feature

# Eventually merge to main for release
git checkout main
git merge dev
```

### Branch Names
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `release/vX.Y.Z` - Release branches

---

## 📁 Project Structure

```
Agile-Lab/
├── src/                    # Backend code
│   ├── server.js          # Server entry point
│   ├── app.js             # Express routes
│   ├── taskManager.js     # Task CRUD logic
│   ├── logger.js          # Logging system
│   └── health.js          # Health endpoint
├── public/                 # Frontend code
│   ├── index.html         # HTML UI
│   ├── style.css          # Styling
│   └── app.js             # Frontend logic
├── tests/                  # Test files
│   ├── taskManager.test.js # Task manager tests
│   └── app.test.js        # API route tests
├── logs/                   # Application logs (created runtime)
├── .github/workflows/      # CI/CD configuration
│   └── ci.yml             # GitHub Actions workflow
├── package.json           # Project dependencies
├── README.md              # Main documentation
├── FEATURES.md            # Feature backlog
├── TESTING.md             # Testing strategy
├── DEVOPS.md              # DevOps & logging docs
├── API.md                 # API reference
└── QUICKSTART.md          # This file
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port
PORT=3001 npm start

# Or kill process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or kill process (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Tests Failing
```bash
# Run in verbose mode
npm test -- --verbose

# Run specific test file
npm test tests/taskManager.test.js

# Check test coverage
npm run test:coverage
```

### Server Won't Start
```bash
# Check if Node.js is installed
node --version

# Verify npm is working
npm --version

# Try with explicit Node path
node src/server.js
```

---

## 📊 Example Workflow

### 1. Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express.js"}'
```

Response:
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "task-1705326600000-abc123",
    "title": "Learn Express.js",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. View All Tasks
```bash
curl http://localhost:3000/api/tasks
```

### 3. Get Statistics
```bash
curl http://localhost:3000/api/stats
```

### 4. Mark Task Complete
```bash
curl -X PUT http://localhost:3000/api/tasks/task-1705326600000-abc123 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

### 5. Check Health
```bash
curl http://localhost:3000/health
```

---

## 🔐 Environment Variables

Create `.env` file (optional):
```
PORT=3000
NODE_ENV=development
```

---

## 📚 Detailed Documentation

- **README.md** - Complete project overview
- **FEATURES.md** - Feature backlog and user stories
- **TESTING.md** - Testing strategy and coverage
- **DEVOPS.md** - DevOps practices and CI/CD
- **API.md** - Full API reference with examples

---

## 💡 Tips

### View Logs
```bash
# Real-time log monitoring
npm run dev

# View stored logs
type logs\app.log        # Windows
cat logs/app.log         # macOS/Linux
tail -f logs/app.log     # macOS/Linux - monitor in real-time
```

### Test Coverage
```bash
npm run test:coverage

# View HTML report
open coverage/lcov-report/index.html    # macOS
start coverage/lcov-report/index.html   # Windows
```

### Format Code (Optional)
Add to package.json scripts:
```json
"format": "prettier --write \"src/**/*.js\" \"public/**/*.js\""
```

---

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start server: `npm start`
3. ✅ Open browser: http://localhost:3000
4. ✅ Create a task via UI or API
5. ✅ Run tests: `npm test`
6. ✅ Check logs: `tail -f logs/app.log`
7. ✅ Review API docs: [API.md](API.md)
8. ✅ Explore code: Start with `src/server.js`

---

## 🆘 Getting Help

- Check the README.md for overview
- Review API.md for endpoint details
- See DEVOPS.md for monitoring
- Check test files for examples
- View logs/app.log for error messages

---

## 🚀 Ready to Deploy?

See [DEVOPS.md](DEVOPS.md#deployment-checklist) for production deployment checklist.

---

Happy coding! 🎉
