/**
 * Tests for Task Utilities
 */

const {
  filterByStatus,
  searchTasks,
  sortByDate,
  sortByTitle,
  getTaskStatistics,
  paginateTasks,
} = require('../src/taskUtils');

describe('Task Utilities', () => {
  const mockTasks = [
    { id: '1', title: 'Buy groceries', status: 'pending', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: '2', title: 'Write report', status: 'completed', createdAt: '2026-01-02T00:00:00.000Z' },
    { id: '3', title: 'Call client', status: 'pending', createdAt: '2026-01-03T00:00:00.000Z' },
    { id: '4', title: 'Review code', status: 'completed', createdAt: '2026-01-04T00:00:00.000Z' },
  ];

  describe('filterByStatus', () => {
    test('should filter pending tasks', () => {
      const result = filterByStatus(mockTasks, 'pending');
      expect(result).toHaveLength(2);
      expect(result[0].status).toBe('pending');
      expect(result[1].status).toBe('pending');
    });

    test('should filter completed tasks', () => {
      const result = filterByStatus(mockTasks, 'completed');
      expect(result).toHaveLength(2);
      expect(result.every(t => t.status === 'completed')).toBe(true);
    });

    test('should return all tasks when status is null', () => {
      const result = filterByStatus(mockTasks, null);
      expect(result).toHaveLength(4);
    });

    test('should handle non-array input', () => {
      expect(filterByStatus(null, 'pending')).toBe(null);
    });
  });

  describe('searchTasks', () => {
    test('should find tasks by title', () => {
      const result = searchTasks(mockTasks, 'report');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Write report');
    });

    test('should be case-insensitive', () => {
      const result = searchTasks(mockTasks, 'WRITE');
      expect(result).toHaveLength(1);
    });

    test('should find multiple matches', () => {
      const result = searchTasks(mockTasks, 'e');
      expect(result.length).toBeGreaterThan(0);
    });

    test('should return all tasks when search term is empty', () => {
      const result = searchTasks(mockTasks, '');
      expect(result).toHaveLength(4);
    });

    test('should handle non-array input', () => {
      expect(searchTasks(null, 'test')).toBe(null);
    });
  });

  describe('sortByDate', () => {
    test('should sort by date descending (newest first)', () => {
      const result = sortByDate(mockTasks, 'desc');
      expect(result[0].id).toBe('4');
      expect(result[3].id).toBe('1');
    });

    test('should sort by date ascending (oldest first)', () => {
      const result = sortByDate(mockTasks, 'asc');
      expect(result[0].id).toBe('1');
      expect(result[3].id).toBe('4');
    });

    test('should not mutate original array', () => {
      const original = [...mockTasks];
      sortByDate(mockTasks, 'desc');
      expect(mockTasks).toEqual(original);
    });

    test('should handle non-array input', () => {
      expect(sortByDate(null, 'desc')).toBe(null);
    });
  });

  describe('sortByTitle', () => {
    test('should sort alphabetically ascending', () => {
      const result = sortByTitle(mockTasks, 'asc');
      expect(result[0].title).toBe('Buy groceries');
      expect(result[3].title).toBe('Write report');
    });

    test('should sort alphabetically descending', () => {
      const result = sortByTitle(mockTasks, 'desc');
      expect(result[0].title).toBe('Write report');
      expect(result[3].title).toBe('Buy groceries');
    });

    test('should not mutate original array', () => {
      const original = [...mockTasks];
      sortByTitle(mockTasks, 'asc');
      expect(mockTasks).toEqual(original);
    });

    test('should handle non-array input', () => {
      expect(sortByTitle(null, 'asc')).toBe(null);
    });
  });

  describe('getTaskStatistics', () => {
    test('should calculate correct statistics', () => {
      const stats = getTaskStatistics(mockTasks);
      expect(stats.total).toBe(4);
      expect(stats.pending).toBe(2);
      expect(stats.completed).toBe(2);
      expect(stats.completionRate).toBe(50);
    });

    test('should handle empty array', () => {
      const stats = getTaskStatistics([]);
      expect(stats.total).toBe(0);
      expect(stats.completionRate).toBe(0);
    });

    test('should handle all pending tasks', () => {
      const tasks = [
        { status: 'pending' },
        { status: 'pending' },
      ];
      const stats = getTaskStatistics(tasks);
      expect(stats.completionRate).toBe(0);
    });

    test('should handle all completed tasks', () => {
      const tasks = [
        { status: 'completed' },
        { status: 'completed' },
      ];
      const stats = getTaskStatistics(tasks);
      expect(stats.completionRate).toBe(100);
    });

    test('should handle non-array input', () => {
      const stats = getTaskStatistics(null);
      expect(stats.total).toBe(0);
    });
  });

  describe('paginateTasks', () => {
    test('should paginate tasks correctly', () => {
      const result = paginateTasks(mockTasks, 1, 2);
      expect(result.tasks).toHaveLength(2);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(2);
      expect(result.totalPages).toBe(2);
      expect(result.totalItems).toBe(4);
      expect(result.hasNextPage).toBe(true);
      expect(result.hasPrevPage).toBe(false);
    });

    test('should handle second page', () => {
      const result = paginateTasks(mockTasks, 2, 2);
      expect(result.tasks).toHaveLength(2);
      expect(result.hasNextPage).toBe(false);
      expect(result.hasPrevPage).toBe(true);
    });

    test('should handle default page size', () => {
      const result = paginateTasks(mockTasks);
      expect(result.pageSize).toBe(10);
    });

    test('should handle page beyond total pages', () => {
      const result = paginateTasks(mockTasks, 999, 2);
      expect(result.page).toBe(2);
    });

    test('should handle non-array input', () => {
      const result = paginateTasks(null, 1, 10);
      expect(result.tasks).toHaveLength(0);
      expect(result.totalPages).toBe(0);
    });
  });
});
