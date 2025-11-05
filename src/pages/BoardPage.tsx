import BoardActionsDropdown from '@/components/board/board-page-header/BoardActionsDropdown'
import BoardViewSwitch from '@/components/board/board-page-header/BoardViewSwitch'
import AppPageHeader from '@/components/shared/layout/AppPageHeader'
import useBoardStore from '@/stores/board-store/boardStore'
import React, { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router'

export default function BoardPage() {
    const { pathname } = useLocation()

    const isBoard = useMemo(() => {
        return pathname !== "/app/board/"
    }, [pathname])
    const { boards } = useBoardStore()

    const boardId = useMemo(() => pathname.split("/").pop(), [pathname])
    const boardName = boards.find(b => b.board.id === boardId)?.board.name

    return (
        <>
            <AppPageHeader headerTitle={isBoard && boardId && boardName ? boardName : " Add new board"} actionComponent={isBoard && (
                <>
                    <BoardViewSwitch />
                    <BoardActionsDropdown boardId={boardId as string} />
                </>
            )} />
            <Outlet />
        </>
    )
}
