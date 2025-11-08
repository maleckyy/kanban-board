import {
    BarChartSquare02,
    CheckDone01,
    Rows01,
    Settings01,
    Database01,
} from "@untitledui/icons";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import useTaskStore from "@/stores/task-store/taskStore";
import { useMemo } from "react";
import { useLocation } from "react-router";
import NavItemBadge from "./NavItemBadge";
import useBoardStore from "@/stores/board-store/boardStore";

export const AppSidebar = () => {
    const location = useLocation()
    const tasks = useTaskStore((state) => state.tasks)

    const unfinishedTasks = useMemo(() => {
        return tasks.filter(task => task.isDone === false).length
    }, [tasks])

    const boards = useBoardStore(state => state.boards)

    const boardsCount: number = useMemo(() => {
        return boards.length
    }, [boards])

    const boardNavItems = useMemo(() => {
        const boardItems = boards.map(board => {
            return {
                label: board.board.name,
                href: `/app/board/${board.board.id}`,
            }
        })
        const addBoard = {
            label: "+ Add new board",
            href: `/app/board/`,
        }
        return [...boardItems, addBoard]
    }, [boards])

    const navItemsSimple = useMemo<NavItemType[]>(() => {
        return [
            {
                label: "Dashboard",
                href: "/app",
                icon: BarChartSquare02,
            },
            {
                label: "Boards",
                href: "/app/board",
                icon: Rows01,
                items: boardNavItems,
                badge: <NavItemBadge number={boardsCount} />
            },
            {
                label: "Tasks",
                href: "/app/task",
                icon: CheckDone01,
                badge: <NavItemBadge number={unfinishedTasks} />
            },
        ]
    }, [tasks, boards])

    const footerItems = useMemo<NavItemType[]>(() => {
        return [
            {
                label: "Data",
                href: "/app/data",
                icon: Database01,
            },
            {
                label: "Settings",
                href: "/app",
                icon: Settings01,
            },
        ]
    }, [])

    return (
        <SidebarNavigationSimple
            className="z-10"
            items={navItemsSimple}
            showAccountCard={false}
            activeUrl={`${location.pathname}`}
            footerItems={footerItems}
        />
    )
};
