import React from 'react'
import { Plus } from '@untitledui/icons'
import { cx } from '@/utils/cx'

type PropsType = {
    noText?: boolean
}

export default function AddNewTaskButton({ noText }: PropsType) {
    return (
        <button className={cx(
            "flex gap-1 items-center justify-center w-full text-primary text-[12px] cursor-pointer hover:bg-secondary  p-1",
            noText ? "rounded-[50%]" : "rounded"
        )}>
            <Plus size={noText ? 16 : 14} />
            {!noText && <span>Add new task</span>}
        </button>
    )
}
