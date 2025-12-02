import { describe, it, expect, beforeEach } from 'vitest';
import { useBoardStore } from './boardStore';

describe('useBoardStore', () => {
    beforeEach(() => {
        useBoardStore.setState({ boards: [] });
    });

    it('should add a new board', () => {
        const { addNewBoard } = useBoardStore.getState();
        const boardId = addNewBoard('My Board');
        const updatedBoards = useBoardStore.getState().boards;

        expect(updatedBoards.length).toBe(1);
        expect(updatedBoards[0].board.id).toBe(boardId);
        expect(updatedBoards[0].board.name).toBe('My Board');
        expect(updatedBoards[0].columns.length).toBeGreaterThan(0);
    });

    it('should edit board name', () => {
        const boardId = useBoardStore.getState().addNewBoard('Board 1');
        useBoardStore.getState().editBoardName(boardId, 'Updated Board');
        const board = useBoardStore.getState().boards[0].board;
        expect(board.name).toBe('Updated Board');
    });

    it('should delete a board', () => {
        const boardId = useBoardStore.getState().addNewBoard('Board to delete');
        useBoardStore.getState().deleteBoard(boardId);
        expect(useBoardStore.getState().boards.length).toBe(0);
    });

    it('should add a new column to a board', () => {
        const boardId = useBoardStore.getState().addNewBoard('Board 1');
        useBoardStore.getState().addNewColumn(boardId, 'New Column');
        const columns = useBoardStore.getState().boards[0].columns;
        expect(columns.some(col => col.name === 'New Column')).toBe(true);
    });

    it('should update a column name', () => {
        const boardId = useBoardStore.getState().addNewBoard('Board 1');
        const colId = useBoardStore.getState().boards[0].columns[0].id;
        useBoardStore.getState().updateColumnName(boardId, colId, 'Renamed Column');
        const column = useBoardStore.getState().boards[0].columns[0];
        expect(column.name).toBe('Renamed Column');
    });

    it('should delete tasks from a column', () => {
        const boardId = useBoardStore.getState().addNewBoard('Board 1');
        const colId = useBoardStore.getState().boards[0].columns[0].id;
        useBoardStore.getState().addNewTask(boardId, colId);
        expect(useBoardStore.getState().boards[0].columns[0].tasks.length).toBe(1);

        useBoardStore.getState().deleteTasksFromColumn(boardId, colId);
        expect(useBoardStore.getState().boards[0].columns[0].tasks.length).toBe(0);
    });

    it('should add a new task to a column', () => {
        const boardId = useBoardStore.getState().addNewBoard('Board 1');
        const colId = useBoardStore.getState().boards[0].columns[0].id;
        const task = useBoardStore.getState().addNewTask(boardId, colId);

        const tasks = useBoardStore.getState().boards[0].columns[0].tasks;
        expect(tasks.length).toBe(1);
        expect(tasks[0].id).toBe(task?.id);
    });

    it('should update a task', () => {
        const boardId = useBoardStore.getState().addNewBoard('Board 1');
        const colId = useBoardStore.getState().boards[0].columns[0].id;
        const task = useBoardStore.getState().addNewTask(boardId, colId);
        if (!task) return;

        const updatedTask = { ...task, title: 'Updated Task' };
        useBoardStore.getState().updateTask(boardId, colId, updatedTask);

        const tasks = useBoardStore.getState().boards[0].columns[0].tasks;
        expect(tasks[0].title).toBe('Updated Task');
    });

    it('should delete a task', () => {
        const boardId = useBoardStore.getState().addNewBoard('Board 1');
        const colId = useBoardStore.getState().boards[0].columns[0].id;
        const task = useBoardStore.getState().addNewTask(boardId, colId);
        if (!task) return;

        useBoardStore.getState().deleteTask(boardId, colId, task.id);
        expect(useBoardStore.getState().boards[0].columns[0].tasks.length).toBe(0);
    });
});
