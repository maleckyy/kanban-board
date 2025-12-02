import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBoardColumns } from './createBoardColumns';
import { defaultColumnsNames } from '../../../consts/board/defaultColumnsName';

describe('createBoardColumns', () => {
    beforeEach(() => {
        let counter = 0;
        vi.stubGlobal('crypto', {
            randomUUID: () => `mocked-uuid-${counter++}`,
        } as any);
    });

    it('should create columns with default names if custom names not provided', () => {
        const boardId = 'board-123';
        const columns = createBoardColumns(boardId);

        expect(columns.length).toBe(defaultColumnsNames.length);
        columns.forEach((col, idx) => {
            expect(col.name).toBe(defaultColumnsNames[idx]);
            expect(col.boardId).toBe(boardId);
            expect(col.position).toBe(idx);
            expect(col.isCollapsed).toBe(false);
            expect(col.tasks).toEqual([]);
            expect(col.id).toBe(`mocked-uuid-${idx}`);
        });
    });

    it('should create columns with custom names', () => {
        const boardId = 'board-456';
        const customNames = ['Col A', 'Col B'];
        const columns = createBoardColumns(boardId, customNames);

        expect(columns.length).toBe(customNames.length);
        columns.forEach((col, idx) => {
            expect(col.name).toBe(customNames[idx]);
            expect(col.boardId).toBe(boardId);
            expect(col.position).toBe(idx);
            expect(col.isCollapsed).toBe(false);
            expect(col.tasks).toEqual([]);
            expect(col.id).toBe(`mocked-uuid-${idx}`);
        });
    });
});
