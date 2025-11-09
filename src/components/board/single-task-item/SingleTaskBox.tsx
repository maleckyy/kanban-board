import { Task } from '@/types/board/board.type'
import React from 'react'
import { Flag02, CalendarPlus02, CalendarCheck02 } from '@untitledui/icons'
import { getTaskPriorityName } from '../utils/getTaskPriorityName'
import { getTaskPriorityColor } from '../utils/getTaskPriorityColor'
import { truncateText } from '@/utils/text-values/truncateText'
import { cx } from '@/utils/cx'
import { getDeadlineColor } from '../utils/getDeadlineColor'
import { BoardViewType } from '@/stores/board-store/boardViewStore'

type PropsType = {
    task: Task,
    openDialog: () => void
    view: BoardViewType
}

export default function SingleTaskBox({ task, openDialog, view }: PropsType) {
    return (
        <div className={cx('text-primary pb-1 flex', view === "board" ? 'flex-col gap-2' : 'flex-col md:flex-row gap-2')} onClick={openDialog}>
            <h5 className={cx('', view === "board" ? 'text-[15px]' : 'w-full md:w-1/2 text-[14px]')}>{truncateText(task.title, 40)}</h5>
            <div className={cx(' text-[13px]', view === "board" ? 'flex flex-col gap-1' : 'flex flex-col md:grid grid-cols-3 md:gap-2 gap-1 md:w-1/2 w-full')}>
                {/* col name + color in future */}
                <span className='flex gap-2 items-center'><Flag02 fill={getTaskPriorityColor(task.priority)} size={14} />{getTaskPriorityName(task.priority)}</span>
                <span className='flex gap-2 items-center'><CalendarPlus02 size={14} />{new Date(task.createdAt).toLocaleDateString()}</span>
                <span
                    className={cx(
                        'flex gap-2 items-center',
                        getDeadlineColor(task.dueDate)
                    )}
                ><CalendarCheck02 size={14} />{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</span>
            </div>
        </div>
    )
}
