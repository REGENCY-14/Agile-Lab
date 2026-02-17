# Contributing to Task Tracker

Thank you for your interest in contributing to the Task Tracker project! This document provides guidelines for contributing.

## Code of Conduct

- Be respectful of others
- Focus on constructive feedback
- Welcome diverse perspectives
- Follow professional communication standards

## Getting Started

### 1. Fork or Clone the Repository

```bash
git clone https://github.com/REGENCY-14/Agile-Lab.git
cd Agile-Lab
npm install
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Follow Commit Guidelines

Use conventional commit format:

```
type(scope): subject

body

footer
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Test changes
- `docs:` - Documentation
- `style:` - Code style
- `refactor:` - Code refactoring
- `chore:` - Build/tooling

**Example:**
```
feat(taskManager): add task priority levels

- Implement priority field in task model
- Add priority validation
- Update UI to display priority

Closes #42
```

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/my-feature dev
```

### 2. Make Changes
- Write clean, readable code
- Add comments for complex logic
- Follow existing code style
- Keep functions small and focused

### 3. Write Tests
```bash
# Add tests for new functionality
npm test -- --watch

# Ensure coverage > 70%
npm run test:coverage
```

### 4. Run All Tests
```bash
npm test
```

### 5. Commit Incrementally
```bash
git add .
git commit -m "feat(scope): meaningful message"
```

### 6. Push to Feature Branch
```bash
git push origin feature/my-feature
```

### 7. Create Pull Request
- Push to GitHub
- Create PR from feature branch to dev
- Include description of changes
- Reference related issues

### 8. Code Review
- Respond to review comments
- Update code as needed
- Request re-review after updates

### 9. Merge to Dev
- After approval, merge PR to dev
- Delete feature branch
- Close related issues

### 10. Release to Main
```bash
git checkout main
git merge dev
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin main --tags
```

## Code Style Guidelines

### JavaScript Style

```javascript
// Use const/let, not var
const taskId = 'task-123';
let status = 'pending';

// Descriptive function names
const createTask = (title) => {
  // Implementation
};

// Comments for complex logic
// Check if task completion would exceed deadline
if (completionDate > deadline) {
  // Handle logic
}

// Error handling
try {
  const result = await operation();
} catch (error) {
  logger.error('Context', 'Failed operation', error);
  throw error; // or handle gracefully
}
```

### Naming Conventions

- **Functions:** camelCase, verb prefix
  - ✅ `createTask()`, `getTasks()`, `updateStatus()`
  - ❌ `task()`, `tasks()`, `status()`

- **Constants:** UPPER_SNAKE_CASE
  - ✅ `const MAX_TITLE_LENGTH = 255;`
  - ❌ `const maxTitleLength = 255;`

- **Classes:** PascalCase
  - ✅ `class TaskManager {}`
  - ❌ `class taskManager {}`

- **Files:** kebab-case
  - ✅ `task-manager.js`
  - ❌ `taskManager.js`

### File Organization

```
src/
├── server.js              # Server entry point
├── app.js                 # Routes and middleware
├── taskManager.js         # Business logic
├── logger.js              # Logging utility
└── health.js              # Health check utility
```

## Testing Requirements

### Test Coverage
- Minimum 70% code coverage required
- All public functions must have tests
- Test both success and error cases
- Include edge cases

### Test Structure

```javascript
describe('Feature', () => {
  beforeEach(() => {
    // Setup
  });

  describe('Specific functionality', () => {
    test('should perform expected behavior', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = functionUnderTest(input);

      // Assert
      expect(result).toBe('expected');
    });

    test('should handle error case', () => {
      // Test error scenarios
      expect(() => {
        functionUnderTest(null);
      }).toThrow('Error message');
    });
  });
});
```

## Documentation Requirements

### Code Comments
- Explain WHY, not WHAT
- ❌ `// Increment count`
- ✅ `// Increment completed count for statistics`

### Function Documentation
```javascript
/**
 * Create a new task
 * 
 * @param {string} title - Task title
 * @returns {Object} Created task object
 * @throws {Error} If title is invalid
 */
const createTask = (title) => {
  // Implementation
};
```

### Update Documentation Files
- README.md for major changes
- FEATURES.md for new features
- API.md for API changes
- DEVOPS.md for deployment changes

## Pull Request Checklist

Before submitting a PR:

- [ ] Tests pass locally (`npm test`)
- [ ] Code coverage >= 70%
- [ ] No console errors or warnings
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Commit messages are meaningful
- [ ] Documentation updated
- [ ] No large single commits
- [ ] Related issues are referenced

## Reporting Issues

### Bug Reports

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, Node version)
- Error logs or screenshots

### Feature Requests

Include:
- Clear use case
- Proposed solution
- Alternative solutions
- Why it's needed
- Any relevant examples

## Support

- **Questions:** Create an issue with `question` label
- **Bugs:** Create issue with `bug` label
- **Features:** Create issue with `enhancement` label
- **Documentation:** Create issue with `documentation` label

## Release Process

1. Update version in package.json
2. Update CHANGELOG
3. Create release branch
4. Merge to main
5. Create GitHub release
6. Tag with version number
7. Deploy to production

## Performance Considerations

- Keep functions pure when possible
- Avoid deep object mutations
- Cache computations if needed
- Use efficient algorithms
- Monitor memory usage

## Security Considerations

- Validate all inputs
- Don't store passwords/secrets in code
- Use environment variables for sensitive data
- Keep dependencies updated
- Run npm audit regularly
- Sanitize any user input

## Accessibility

- Ensure semantic HTML structure
- Use proper ARIA labels
- Support keyboard navigation
- Maintain color contrast ratios
- Test with screen readers

## Performance Monitoring

```javascript
// Log performance metrics
console.time('operation');
// ... code ...
console.timeEnd('operation');
```

## Resources

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Guide](https://expressjs.com/)
- [Jest Documentation](https://jestjs.io/)
- [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

- Check FEATURES.md for implemented features
- Review DEVOPS.md for deployment info
- See TESTING.md for test examples
- Read API.md for endpoint details

Thank you for contributing! 🎉

---

**Last Updated:** January 2024
