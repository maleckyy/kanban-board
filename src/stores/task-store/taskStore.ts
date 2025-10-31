import { localStorageKeys } from "@/consts/localStorageKeys";
import { TaskItem } from "@/types/task/task.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskState = {
    tasks: TaskItem[];

    addTask: (title: string, description?: string) => void;
    removeTask: (id: string) => void;
    toggleTask: (id: string) => void;
    updateTask: (task: TaskItem) => void;
    clearTasks: () => void;
};

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],

            addTask: (title, description?) => {
                const newTask: TaskItem = {
                    id: crypto.randomUUID(),
                    title,
                    description,
                    createDate: new Date().toISOString(),
                    isDone: false
                };
                set(state => ({ tasks: [newTask, ...state.tasks] }));
            },

            removeTask: id => set(state => ({ tasks: state.tasks.filter(t => t.id !== id) })),

            toggleTask: id =>
                set(state => ({
                    tasks: state.tasks.map(t => (t.id === id ? { ...t, isDone: !t.isDone } : t))
                })),

            updateTask: (taskUpdated: TaskItem) =>
                set(state => ({
                    tasks: state.tasks.map(t => (t.id === taskUpdated.id ? taskUpdated : t))
                })),

            clearTasks: () => set({ tasks: [] }),
        }),
        { name: localStorageKeys.taskStorage }
    )
);

export default useTaskStore;
