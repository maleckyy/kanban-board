import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTask } from './createNewTask';
import { TaskPriority } from '../../../types/board/board.type';

describe('createTask', () => {
    beforeEach(() => {
        vi.stubGlobal('crypto', {
            randomUUID: () => 'mocked-uuid',
        } as any);

        const mockDate = new Date('2025-01-01T00:00:00.000Z');
        vi.stubGlobal('Date', class extends Date {
            constructor() {
                super();
                return mockDate;
            }
            static now() { return mockDate.getTime(); }
        } as any);
    });

    it('should create a task with correct default values', () => {
        const task = createTask('Test Task', 'col-123', 0);

        expect(task.id).toBe('mocked-uuid');
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('');
        expect(task.createdAt).toBe('2025-01-01T00:00:00.000Z');
        expect(task.dueDate).toBeNull();
        expect(task.columnId).toBe('col-123');
        expect(task.position).toBe(0);
        expect(task.priority).toBe(TaskPriority.LOW);
    });
});
