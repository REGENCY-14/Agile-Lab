# Logging & DevOps Implementation

## Logging System

### Implementation (`src/logger.js`)
Structured logging module with multiple log levels and outputs.

**Features:**
- **Log Levels:** INFO, WARN, ERROR
- **Output Destinations:**
  - Console output (for development)
  - File logging (`logs/app.log` - for production/monitoring)
- **Log Format:** [TIMESTAMP] [LEVEL] [CONTEXT] Message

**Usage Examples:**

```javascript
const logger = require('./logger');

// Info level
logger.info('TaskManager', 'Task created successfully');

// Warning level
logger.warn('Server', 'Attempting to reconnect to database');

// Error level
logger.error('Server', 'Failed to process request', error);
```

### Log Files
Logs are written to `logs/app.log`:
- Automatically creates logs directory if missing
- Appends new entries (never overwrites)
- Includes timestamps for correlation

### Monitored Events

**TaskManager Operations:**
- Task creation: `logger.info('TaskManager', 'Task created: ${id}')`
- Task updates: `logger.info('TaskManager', 'Task status updated: ${id}')`
- Task deletion: `logger.info('TaskManager', 'Task deleted: ${id}')`
- Validation errors: `logger.error('TaskManager', 'Invalid input')`

**Server Events:**
- Requests: `logger.info('Server', '${METHOD} ${PATH}')`
- Route errors: `logger.error('Server', 'Error message')`
- Health checks: `logger.info('HealthCheck', 'Health status requested')`
- Startup/shutdown: `logger.info('Server', 'Server started/stopped')`

## Health Endpoint

### Implementation (`src/health.js`)
Provides real-time monitoring of application status.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "uptime": 3600,
  "timestamp": "2024-01-15T10:30:00Z",
  "memory": {
    "heapUsed": 45,
    "heapTotal": 90,
    "rss": 120
  }
}
```

**Metrics:**
- `status`: Application health status
- `uptime`: Seconds since server start
- `timestamp`: Current UTC timestamp
- `memory`: Node.js memory usage in MB

**Use Cases:**
- Kubernetes liveness/readiness probes
- Load balancer health checks
- Monitoring dashboards
- Alerting systems

## DevOps Practices

### CI/CD Pipeline (GitHub Actions)

**Workflow File:** `.github/workflows/ci.yml`

**Jobs:**

1. **Test Job**
   - Runs on: ubuntu-latest
   - Node versions: 14.x, 16.x, 18.x
   - Steps:
     - Checkout code
     - Setup Node.js with npm cache
     - Install dependencies
     - Check syntax
     - Run full test suite with coverage

2. **Build Job**
   - Verify application builds successfully
   - Test server startup
   - Check health endpoint

3. **Coverage Job**
   - Generate coverage reports
   - Comment on pull requests
   - Upload to Codecov

4. **Security Job**
   - Run npm audit
   - Check for vulnerabilities

5. **Notification Job**
   - Final status report

**Triggers:**
- Push to main, dev, or feature/* branches
- Pull requests to main or dev

### Environment Configuration

**Workspace Secrets:**
- GitHub token (automatic)
- Codecov token (optional)

**Environment Variables:**
```bash
NODE_VERSION=18.x  # In CI/CD
PORT=3000          # Default
NODE_ENV=development  # Or production
```

### Docker Support (Optional)

While not implemented in MVP, the application is ready for containerization:

**Dockerfile Example:**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "start"]
```

**Build:**
```bash
docker build -t task-tracker:1.0 .
docker run -p 3000:3000 task-tracker:1.0
```

### Monitoring & Alerting

**Key Metrics to Monitor:**
- Response times
- Error rates
- Task creation/completion rates
- Memory usage
- CPU usage
- Server uptime

**Recommended Tools:**
- Prometheus (metrics collection)
- Grafana (visualization)
- ELK Stack (log aggregation)
- Sentry (error tracking)
- New Relic (APM)

### Deployment Checklist

Before deploying to production:

- [ ] All tests pass (100% success rate)
- [ ] Code coverage ≥70%
- [ ] Security audit passes (npm audit)
- [ ] No console errors or warnings
- [ ] Health endpoint responds correctly
- [ ] Load testing successful (150+ req/s)
- [ ] Documentation updated
- [ ] Release notes prepared
- [ ] Rollback procedure documented
- [ ] Monitoring alerts configured

### Version Control Strategy

**Branch Protection Rules (Main):**
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- Require code review from owner

**Branch Naming:**
- Feature branches: `feature/description`
- Bug fixes: `bugfix/description`
- Hotfixes: `hotfix/description`
- Release branches: `release/version`

**Commit Message Format:**
```
type(scope): subject

body

footer
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Test changes
- `chore:` - Build/deployment/tooling
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring

## Infrastructure as Code

### GitHub Actions as IaC
The CI/CD pipeline is defined in YAML:
- Version controlled
- Reproducible
- Easily modified
- No manual configurations needed

### Scalability Considerations

**Current (Single Instance):**
- In-memory task storage
- Suitable for prototypes/demos
- Auto-scaling not needed

**Future (Production):**
- Database (MongoDB/PostgreSQL)
- Load balancer
- Multiple instances
- Session replication
- Cache layer (Redis)

## Agile Practices

### Sprint Integration
Each deployment represents a sprint:
1. Features developed in isolation
2. All tests passing in CI/CD
3. Code reviewed via pull requests
4. Merged to dev, then to main
5. Automatic testing on every push

### Metrics
- **Deployment Frequency:** Every push to main
- **Mean Lead Time:** Days to merge
- **Mean Time to Recovery:** Automatic rollback available
- **Change Failure Rate:** 0% (all tests must pass)

## Monitoring in Production

### Logs Collection
```bash
# View logs locally
tail -f logs/app.log

# grep for errors
grep ERROR logs/app.log

# Monitor in real-time
watch -n 1 'tail logs/app.log'
```

### Performance Monitoring
```bash
# Check health every 10 seconds
watch -n 10 'curl http://localhost:3000/health'

# Get uptime stats
curl http://localhost:3000/health | json_pp
```

