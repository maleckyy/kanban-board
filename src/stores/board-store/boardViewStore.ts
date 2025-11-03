import { localStorageKeys } from '@/consts/localStorageKeys'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type BoardViewType = "board" | "list"

type BoardViewStoreType = {
    boardView: BoardViewType,
    setView: (f: BoardViewType) => void
}

export const useBoardViewStore = create<BoardViewStoreType>()(
    persist(
        (set) => ({
            boardView: "board",
            setView: (f: BoardViewType) => set({ boardView: f })
        }),
        {
            name: localStorageKeys.boardView,
        }
    )
)