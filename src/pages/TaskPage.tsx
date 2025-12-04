import AppPageHeader from '@/components/shared/layout/AppPageHeader'
import { TaskTable } from '@/components/task-module/task-table/TaskTable'
import React from 'react'

export default function TaskPage() {
    return (
        <>
            <AppPageHeader headerTitle='Tasks' datatestId='task-header' />
            <TaskTable />
        </>
    )
}
