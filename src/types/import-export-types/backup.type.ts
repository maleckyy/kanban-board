import { BoardOutput } from "../board/board.type"

export type LSZustandBoardStorage = {
    state: BoardOutput[]
    version: number
}