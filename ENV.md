# Environment Variables

This document describes all environment variables used by the Agile Lab Task Tracker application.

## Server Configuration

### PORT
- **Description**: HTTP port the server listens on
- **Type**: Number
- **Default**: `3000`
- **Example**: `PORT=8080`
- **Required**: No

### HOST
- **Description**: Host address the server binds to
- **Type**: String
- **Default**: `localhost`
- **Example**: `HOST=0.0.0.0`
- **Required**: No

### NODE_ENV
- **Description**: Application environment mode
- **Type**: String
- **Valid Values**: `development`, `production`, `test`
- **Default**: `development`
- **Example**: `NODE_ENV=production`
- **Required**: No
- **Notes**: 
  - Affects logging verbosity
  - DEBUG logs only appear when not set to `production`
  - Production mode enables optimizations

## Logging Configuration

### LOG_LEVEL
- **Description**: Minimum log level to output
- **Type**: String
- **Valid Values**: `debug`, `info`, `warn`, `error`
- **Default**: `info`
- **Example**: `LOG_LEVEL=debug`
- **Required**: No

### LOG_TO_FILE
- **Description**: Enable/disable file logging
- **Type**: Boolean
- **Default**: `true`
- **Example**: `LOG_TO_FILE=false`
- **Required**: No

### LOG_DIR
- **Description**: Directory path for log files
- **Type**: String
- **Default**: `logs`
- **Example**: `LOG_DIR=/var/log/app`
- **Required**: No

## Application Settings

### MAX_TASKS_PER_USER
- **Description**: Maximum number of tasks allowed per user
- **Type**: Number
- **Default**: `1000`
- **Example**: `MAX_TASKS_PER_USER=500`
- **Required**: No
- **Notes**: Prevents resource exhaustion

## Feature Flags

### ENABLE_HEALTH_CHECK
- **Description**: Enable/disable the /health endpoint
- **Type**: Boolean
- **Default**: `true`
- **Example**: `ENABLE_HEALTH_CHECK=false`
- **Required**: No

### DEBUG_MODE
- **Description**: Enable debug mode with extra logging and diagnostics
- **Type**: Boolean
- **Default**: `false`
- **Example**: `DEBUG_MODE=true`
- **Required**: No
- **Notes**: Should not be enabled in production

## Example Configuration Files

### Development (.env.development)
```bash
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
DEBUG_MODE=true
MAX_TASKS_PER_USER=1000
```

### Production (.env.production)
```bash
NODE_ENV=production
PORT=8080
HOST=0.0.0.0
LOG_LEVEL=info
LOG_TO_FILE=true
DEBUG_MODE=false
ENABLE_HEALTH_CHECK=true
MAX_TASKS_PER_USER=500
```

### Testing (.env.test)
```bash
NODE_ENV=test
PORT=3001
LOG_LEVEL=error
LOG_TO_FILE=false
DEBUG_MODE=false
```

## Best Practices

1. **Never commit .env files** - Add them to .gitignore
2. **Use .env.example** - Provide a template without sensitive values
3. **Validate on startup** - Check required variables exist
4. **Document changes** - Update this file when adding new variables
5. **Use defaults** - Provide sensible defaults for all variables
6. **Type safety** - Parse and validate variable types
7. **Security** - Never log sensitive environment variables

## Loading Environment Variables

The application uses the built-in Node.js `process.env` to access variables. 

For local development, you can use the `dotenv` package:

```javascript
require('dotenv').config();
```

## Verifying Configuration

To verify your environment configuration:

```bash
# Check all environment variables
node -e "console.log(process.env)"

# Check specific variable
echo $PORT  # Unix/Linux/macOS
echo %PORT% # Windows
```
