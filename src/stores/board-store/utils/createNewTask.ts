import { Task, TaskPriority } from "../../../types/board/board.type";

export function createTask(
    title: string,
    columnId: string,
    position: number
): Task {
    return {
        id: crypto.randomUUID(),
        title,
        description: '',
        createdAt: new Date().toISOString(),
        dueDate: null,
        columnId,
        position,
        priority: TaskPriority.LOW
    }
}