import { useGlobalModal } from '@/components/application/modals/AppModal';
import ModalFooterButtons from '@/components/application/modals/ModalFooterButtons';
import { Input } from '@/components/base/input/input';
import { TextArea } from '@/components/base/textarea/textarea';
import useTaskStore from '@/stores/task-store/taskStore';
import { TaskItem } from '@/types/task/task.type';
import React, { useEffect, useRef, useState } from 'react'

type PropsType = {
    taskData?: TaskItem
}

export default function ModalTaskForm({ taskData }: PropsType) {
    const [title, setTitle] = useState<string>(() => {
        if (taskData) return taskData.title
        return ''
    })
    const taskTitleRef = useRef<HTMLInputElement | null>(null)
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

    useEffect(() => {
        setTimeout(() => {
            if (taskTitleRef.current) {
                const input = taskTitleRef.current;
                input.focus();
                const length = input.value.length;
                input.setSelectionRange(length, length);
            }
        }, 50)
    }, []);

    return (
        <div className='flex flex-col gap-3'>
            <Input isRequired placeholder="Task title" value={title} onChange={setTitle} aria-label='task title' ref={taskTitleRef} name="task-title" />
            <TextArea ref={textareaRef} placeholder="This is a placeholder." rows={5} aria-label='task description' defaultValue={taskData?.description ?? ''} name="task-desc" />
            <ModalFooterButtons successFn={submitTask} successBtnDisabled={title.trim() === ''} successBtnText={taskData ? "Save" : "Add"} />
        </div>
    )
}
