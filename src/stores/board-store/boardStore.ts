import { localStorageKeys } from "@/consts/localStorageKeys";
import { Board, BoardColumn, BoardOutput, BoardsData, Task } from "@/types/board/board.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createTask } from "./utils/createNewTask";
import { createBoardColumns } from "./utils/createBoardColumns";

export type BoardState = {
    boards: BoardsData;

    addNewBoard: (title: string, customColumnsNames?: string[]) => string
    editBoardName: (boardId: string, title: string) => void
    deleteBoard: (boardId: string) => void

    addNewColumn: (boardId: string, colTitle: string) => void
    updateColumns: (boardId: string, cols: BoardColumn[]) => void

    deleteColumn: (boardId: string, colId: string) => void

    addNewTask: (boardId: string, colId: string) => Task | null
    updateTask: (boardId: string, colId: string, updatedTask: Task) => void
    deleteTask: (boardId: string, colId: string, taskId: string) => void
};

export const useBoardStore = create<BoardState>()(
    persist(
        (set, get) => ({
            boards: [],

            addNewBoard: (title, customColumnsNames) => {
                const newBoardInfo: Board = {
                    id: crypto.randomUUID(),
                    name: title,
                    createdAt: new Date().toISOString(),
                };

                const newBoardData: BoardOutput = {
                    board: newBoardInfo,
                    columns: createBoardColumns(newBoardInfo.id, customColumnsNames)
                }

                set(state => ({
                    boards: [...state.boards, newBoardData]
                }));

                return newBoardInfo.id
            },

            editBoardName: (boardId: string, title: string) => {
                set(state => ({
                    boards: state.boards.map((boardOutput: BoardOutput) => {
                        if (boardOutput.board.id === boardId) {
                            return {
                                columns: boardOutput.columns,
                                board: {
                                    ...boardOutput.board,
                                    name: title
                                }
                            }
                        }
                        return boardOutput
                    })
                }))
            },

            deleteBoard: (boardId: string) => {
                set(state => ({
                    boards: state.boards.filter((boardOutput: BoardOutput) => boardOutput.board.id !== boardId)
                }))
            },

            // Columns
            addNewColumn: (boardId: string, colTitle: string) => {
                set(state => ({
                    boards: state.boards.map((boardOutput: BoardOutput) => {
                        if (boardOutput.board.id === boardId) {
                            return {
                                ...boardOutput,
                                columns: [...boardOutput.columns,
                                {
                                    id: crypto.randomUUID(),
                                    name: colTitle,
                                    position: boardOutput.columns.length,
                                    boardId: boardId,
                                    tasks: []
                                }
                                ],
                            }
                        }
                        return boardOutput
                    })
                }))
            },

            updateColumns: (boardId: string, cols: BoardColumn[]) => {
                set(state => ({
                    boards: state.boards.map((boardOutput: BoardOutput) => {
                        if (boardOutput.board.id === boardId) {
                            return {
                                ...boardOutput,
                                columns: cols
                            }
                        }
                        return boardOutput
                    })
                }))
            },

            deleteColumn: (boardId: string, colId: string) => {
                set(state => ({
                    boards: state.boards.map((boardOutput: BoardOutput) => {
                        if (boardOutput.board.id === boardId) {
                            return {
                                ...boardOutput,
                                columns: boardOutput.columns.filter(col => col.id !== colId)
                            }
                        }
                        return boardOutput
                    })
                }))
            },

            // Task
            addNewTask: (boardId: string, colId: string) => {
                const { boards } = get()

                const boardIndex = boards.findIndex(b => b.board.id === boardId)
                if (boardIndex === -1) return null

                const colIndex = boards[boardIndex].columns.findIndex(c => c.id === colId)
                if (colIndex === -1) return null

                const column = boards[boardIndex].columns[colIndex]

                const newTaskPos = column.tasks.length
                const newTask = createTask("New task", colId, newTaskPos)

                set(state => {
                    const updatedBoards = state.boards.map((b, i) => {
                        if (i !== boardIndex) return b

                        const updatedColumns = b.columns.map((col, j) => {
                            if (j !== colIndex) return col
                            return {
                                ...col,
                                tasks: [...col.tasks, newTask],
                            }
                        })

                        return {
                            ...b,
                            columns: updatedColumns,
                        }
                    })

                    return { boards: updatedBoards }
                })

                return newTask
            },

            updateTask: (boardId: string, colId: string, updatedTask: Task) => {
                set(state => ({
                    boards: state.boards.map(board => {
                        if (board.board.id !== boardId) return board;

                        return {
                            ...board,
                            columns: board.columns.map(col => {
                                if (col.tasks.some(t => t.id === updatedTask.id) && col.id !== colId) {
                                    return {
                                        ...col,
                                        tasks: col.tasks.filter(t => t.id !== updatedTask.id),
                                    };
                                }
                                if (col.id === colId) {
                                    return {
                                        ...col,
                                        tasks: [
                                            ...col.tasks.filter(t => t.id !== updatedTask.id),
                                            updatedTask
                                        ]
                                    };
                                }
                                return col;
                            }),
                        };
                    }),
                }))
            },

            deleteTask: (boardId: string, colId: string, taskId: string) => {
                set(state => ({
                    boards: state.boards.map(board => {
                        if (board.board.id !== boardId) return board

                        return {
                            ...board,
                            columns: board.columns.map(col => {
                                if (col.id !== colId) return col

                                return {
                                    ...col,
                                    tasks: col.tasks.filter(task => task.id !== taskId),
                                }
                            }),
                        }
                    }),
                }))
            },
        }),
        { name: localStorageKeys.boardStorage }
    )
);

export default useBoardStore;