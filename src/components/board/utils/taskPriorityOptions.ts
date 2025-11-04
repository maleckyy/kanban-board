import { TaskPriority } from "@/types/board/board.type";
import { getTaskPriorityName } from "./getTaskPriorityName";

export const taskPriorityOptions = Object.keys(TaskPriority)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
        value: TaskPriority[key as keyof typeof TaskPriority],
        label: getTaskPriorityName(TaskPriority[key as keyof typeof TaskPriority])
    }));