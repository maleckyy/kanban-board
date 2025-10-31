import { useGlobalModal } from '@/components/application/modals/AppModal';
import ModalFooterButtons from '@/components/application/modals/ModalFooterButtons';
import { Input } from '@/components/base/input/input';
import { TextArea } from '@/components/base/textarea/textarea';
import useTaskStore from '@/stores/task-store/taskStore';
import { TaskItem } from '@/types/task/task.type';
import React, { useRef, useState } from 'react'

type PropsType = {
    taskData?: TaskItem
}

export default function ModalTaskForm({ taskData }: PropsType) {
    const [title, setTitle] = useState<string>(() => {
        if (taskData) return taskData.title
        return ''
    })
    const addTaskToStore = useTaskStore((state) => state.addTask)
    const updateTaskToStore = useTaskStore((state) => state.updateTask)
    const { closeModal } = useGlobalModal();

    const textareaRef = useRef<HTMLDivElement | null>(null)

    function submitTask() {
        if (textareaRef.current && title.trim() !== '') {
            const firstChild = textareaRef.current.children.item(0) as HTMLTextAreaElement;

            if (taskData) {
                updateTaskToStore({
                    ...taskData, title: title, description: firstChild.value
                })
            } else {
                addTaskToStore(title, firstChild.value)
            }
            closeModal()
        }
    }

    return (
        <div className='flex flex-col gap-3'>
            <Input isRequired placeholder="Task title" value={title} onChange={setTitle} aria-label='task title' />
            <TextArea ref={textareaRef} placeholder="This is a placeholder." rows={5} aria-label='task description' value={taskData?.description ?? ''} />
            <ModalFooterButtons successFn={submitTask} successBtnDisabled={title.trim() === ''} successBtnText={taskData ? "Save" : "Add"} />
        </div>
    )
}
