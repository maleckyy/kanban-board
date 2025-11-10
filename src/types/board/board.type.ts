export type BoardOutput = {
    board: Board,
    columns: BoardColumn[]
}

export type Board = {
    id: string
    createdAt: string
    name: string
}

export type BoardColumn = {
    id: string
    boardId: string
    name: string
    position: number
    isCollapsed: boolean
    tasks: Task[]
}

export type Task = {
    id: string
    title: string
    description: string
    createdAt: string
    dueDate: string | null | undefined
    columnId: string
    position: number
    priority: TaskPriority
}

export enum TaskPriority {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2,
    URGENT = 3
}


export type BoardsData = BoardOutput[]

export type BoardColumnSelectType = {
    id: string
    name: string
}