import React from 'react'
import { Plus } from '@untitledui/icons'
import { cx } from '@/utils/cx'

type PropsType = {
    noText?: boolean,
    onClick?: () => void
}

export default function AddNewTaskButton({ noText, onClick }: PropsType) {
    return (
        <button onClick={onClick} className={cx(
            "flex gap-1 items-center justify-center w-full text-primary text-[12px] cursor-pointer hover:bg-secondary p-1 mt-2",
            noText ? "rounded-[50%]" : "rounded"
        )}>
            <Plus size={noText ? 16 : 14} />
            <span className={noText ? 'sr-only' : ''}>Add new task</span>
        </button>
    )
}
