import { TaskTable } from '@/components/task-module/task-table/TaskTable'
import PageTitle from '@/styled-components/texts/PageTitle'
import React from 'react'

export default function TaskPage() {
    return (
        <>
            <PageTitle>Tasks</PageTitle>
            <TaskTable />
        </>
    )
}
