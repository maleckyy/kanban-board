// src/stores/taskStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useTaskStore } from './taskStore';
import { TaskItem } from '@/types/task/task.type';

describe('useTaskStore', () => {
    beforeEach(() => {
        useTaskStore.setState({ tasks: [] });
    });

    it('should start with an empty tasks array', () => {
        const { tasks } = useTaskStore.getState();
        expect(tasks).toEqual([]);
    });

    it('should add a task', () => {
        const { addTask } = useTaskStore.getState();
        addTask('New Task', 'Description');

        const newTasks = useTaskStore.getState().tasks;
        expect(newTasks.length).toBe(1);
        expect(newTasks[0].title).toBe('New Task');
        expect(newTasks[0].description).toBe('Description');
        expect(newTasks[0].isDone).toBe(false);
        expect(newTasks[0].id).toBeDefined();
        expect(newTasks[0].createDate).toBeDefined();
    });

    it('should remove a task', () => {
        const { addTask, removeTask } = useTaskStore.getState();
        addTask('Task to remove');
        const task = useTaskStore.getState().tasks[0];

        removeTask(task.id);
        expect(useTaskStore.getState().tasks).toEqual([]);
    });

    it('should toggle task completion', () => {
        const { addTask, toggleTask } = useTaskStore.getState();
        addTask('Task to toggle');
        const task = useTaskStore.getState().tasks[0];

        toggleTask(task.id);
        expect(useTaskStore.getState().tasks[0].isDone).toBe(true);

        toggleTask(task.id);
        expect(useTaskStore.getState().tasks[0].isDone).toBe(false);
    });

    it('should update a task', () => {
        const { addTask, updateTask } = useTaskStore.getState();
        addTask('Original', 'Original Desc');
        const task = useTaskStore.getState().tasks[0];

        const updatedTask: TaskItem = { ...task, title: 'Updated', description: 'Updated Desc' };
        updateTask(updatedTask);

        expect(useTaskStore.getState().tasks[0].title).toBe('Updated');
        expect(useTaskStore.getState().tasks[0].description).toBe('Updated Desc');
    });

    it('should remove completed tasks', () => {
        const { addTask, toggleTask, removeCompleted } = useTaskStore.getState();
        addTask('Task 1');
        addTask('Task 2');
        const tasks = useTaskStore.getState().tasks;
        toggleTask(tasks[0].id);
        removeCompleted();
        const remainingTasks = useTaskStore.getState().tasks;
        expect(remainingTasks.length).toBe(1);
        expect(remainingTasks[0].title).toBe('Task 1');
    });

    it('should clear all tasks', () => {
        const { addTask, clearTasks } = useTaskStore.getState();
        addTask('Task 1');
        addTask('Task 2');

        clearTasks();
        expect(useTaskStore.getState().tasks).toEqual([]);
    });
});
