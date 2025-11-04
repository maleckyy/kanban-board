import { Task } from '@/types/board/board.type'
import React from 'react'
import { Flag02, CalendarPlus02 } from '@untitledui/icons'
import { getTaskPriorityName } from '../utils/getTaskPriorityName'
import { getTaskPriorityColor } from '../utils/getTaskPriorityColor'
import { truncateText } from '@/utils/text-values/truncateText'
type PropsType = {
    task: Task,
    openDialog: () => void
}

export default function SingleTaskBox({ task, openDialog }: PropsType) {
    return (
        <div className='text-primary pb-1 flex flex-col gap-2' onClick={openDialog}>
            <h5 className='text-[15px]'>{truncateText(task.title, 40)}</h5>
            <div className=' flex flex-col gap-1 text-[13px]'>
                {/* col name + color in future */}
                <span className='flex gap-2 items-center'><Flag02 fill={getTaskPriorityColor(task.priority)} size={14} />{getTaskPriorityName(task.priority)}</span>
                <span className='flex gap-2 items-center'><CalendarPlus02 size={14} />{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    )
}
