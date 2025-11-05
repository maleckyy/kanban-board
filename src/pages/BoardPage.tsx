import BoardActionsDropdown from '@/components/board/board-page-header/BoardActionsDropdown'
import BoardViewSwitch from '@/components/board/board-page-header/BoardViewSwitch'
import AppPageHeader from '@/components/shared/layout/AppPageHeader'
import React, { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router'

export default function BoardPage() {
    const { pathname } = useLocation()

    const isBoard = useMemo(() => {
        return pathname !== "/app/board/"
    }, [pathname])

    return (
        <>
            <AppPageHeader headerTitle={isBoard ? "Board" : " Add new board"} actionComponent={isBoard && (
                <>
                    <BoardViewSwitch />
                    <BoardActionsDropdown />
                </>
            )} />
            <Outlet />
        </>
    )
}
