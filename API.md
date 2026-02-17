# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Currently, no authentication is required. Future versions will implement:
- JWT tokens
- API keys
- OAuth2 integration

## Response Format

All responses follow a consistent JSON structure:

### Success Response
```json
{
  "success": true,
  "message": "Operation description",
  "data": { /* ... */ },
  "count": 5
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Endpoints

### 1. Create Task
**POST** `/api/tasks`

Create a new task.

**Request:**
```json
{
  "title": "Buy groceries"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "task-1705326600000-abc123",
    "title": "Buy groceries",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errors:**
- 400 Bad Request: Missing or invalid title
- 400 Bad Request: Title must be non-empty string

---

### 2. Get All Tasks
**GET** `/api/tasks`

Retrieve all tasks.

**Query Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "task-1705326600000-abc123",
      "title": "Buy groceries",
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": "task-1705326601000-def456",
      "title": "Complete project",
      "status": "completed",
      "createdAt": "2024-01-14T10:30:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z"
    }
  ],
  "count": 2
}
```

---

### 3. Get Single Task
**GET** `/api/tasks/:id`

Retrieve a specific task by ID.

**Path Parameters:**
- `id` (string, required): Task ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "id": "task-1705326600000-abc123",
    "title": "Buy groceries",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errors:**
- 404 Not Found: Task with given ID not found

---

### 4. Update Task Status
**PUT** `/api/tasks/:id`

Update a task's status.

**Path Parameters:**
- `id` (string, required): Task ID

**Request:**
```json
{
  "status": "completed"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "task-1705326600000-abc123",
    "title": "Buy groceries",
    "status": "completed",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

**Status Values:**
- `pending` - Task is pending
- `completed` - Task is completed

**Errors:**
- 400 Bad Request: Invalid status value
- 400 Bad Request: Task not found

---

### 5. Delete Task
**DELETE** `/api/tasks/:id`

Delete a task permanently.

**Path Parameters:**
- `id` (string, required): Task ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": "task-1705326600000-abc123",
    "title": "Buy groceries",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errors:**
- 400 Bad Request: Task not found

---

### 6. Get Task Statistics
**GET** `/api/stats`

Get aggregated task statistics.

**Query Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "totalTasks": 15,
    "completedTasks": 9,
    "pendingTasks": 6,
    "completionRate": 60
  }
}
```

---

### 7. Health Check
**GET** `/health`

Check application health and get system metrics.

**Query Parameters:** None

**Response (200 OK):**
```json
{
  "status": "healthy",
  "uptime": 3600,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "memory": {
    "heapUsed": 45,
    "heapTotal": 90,
    "rss": 120
  }
}
```

**Fields:**
- `status` (string): `healthy` or `unhealthy`
- `uptime` (number): Seconds since server started
- `timestamp` (string): ISO 8601 formatted timestamp
- `memory` (object): Memory usage in MB
  - `heapUsed`: Used heap memory
  - `heapTotal`: Total allocated heap
  - `rss`: Resident set size

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or task not found |
| 404 | Not Found - Route doesn't exist |
| 500 | Internal Server Error - Server error |

## Rate Limiting

Currently not implemented. Future versions will include:
- 100 requests per minute per IP
- 1000 requests per hour per IP
- Custom headers for rate limit info

## Error Handling

All errors include descriptive messages:

```json
{
  "success": false,
  "message": "Task title is required and must be a non-empty string"
}
```

## Example Usage

### cURL

```bash
# Create task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries"}'

# Get all tasks
curl http://localhost:3000/api/tasks

# Get single task
curl http://localhost:3000/api/tasks/task-1705326600000-abc123

# Update task
curl -X PUT http://localhost:3000/api/tasks/task-1705326600000-abc123 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'

# Delete task
curl -X DELETE http://localhost:3000/api/tasks/task-1705326600000-abc123

# Health check
curl http://localhost:3000/health
```

### JavaScript/Fetch

```javascript
// Create task
const response = await fetch('/api/tasks', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({title: 'Buy groceries'})
});
const task = await response.json();

// Get all tasks
const tasks = await fetch('/api/tasks').then(r => r.json());

// Update task
const updated = await fetch(`/api/tasks/${taskId}`, {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({status: 'completed'})
}).then(r => r.json());

// Delete task
await fetch(`/api/tasks/${taskId}`, {method: 'DELETE'});
```

## Versioning Strategy

Currently on v1. Future versions will use:
- URL versioning: `/api/v2/tasks`
- Header versioning: `Accept: application/vnd.tasktracker.v2+json`

## Changelog

### v1.0.0 (Current)
- Initial release
- Task CRUD operations
- Health endpoint
- Basic statistics

### v1.1.0 (Planned)
- Task priority levels
- Task due dates
- Advanced filtering

### v2.0.0 (Planned)
- User authentication
- Database persistence
- WebSocket support
