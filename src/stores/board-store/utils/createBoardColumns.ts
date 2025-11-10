import { defaultColumnsNames } from "@/consts/board/defaultColumnsName"
import { BoardColumn } from "@/types/board/board.type"

export function createBoardColumns(boardId: string, customColumnsNames: string[] = defaultColumnsNames): BoardColumn[] {

    const columns: BoardColumn[] = customColumnsNames.map((name, idx) => {
        const col: BoardColumn = {
            id: crypto.randomUUID(),
            name: name,
            boardId: boardId,
            position: idx,
            isCollapsed: false,
            tasks: []
        }
        return col
    })

    return columns
}