import { defaultColumnsNames } from "@/consts/board/defaultColumnsName"
import { BoardColumn } from "@/types/board/board.type"

export function createInitialColumns(boardId: string): BoardColumn[] {

    const columns: BoardColumn[] = defaultColumnsNames.map((name, idx) => {
        const col: BoardColumn = {
            id: crypto.randomUUID(),
            name: name,
            boardId: boardId,
            position: idx,
            tasks: []
        }
        return col
    })

    return columns
}